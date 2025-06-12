import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // find all products
        res.json({ products });
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const searchProducts = async (req, res) => {
  try {
    const query = req.params.query;
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }
    });
    res.json(products);
  } catch (error) {
    console.log('Error in searchProducts controller', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
    try {
        console.log('📝 Getting featured products...');
        
        let featuredProducts;
        
        // التحقق من Redis إذا كان متاحاً
        if (redis) {
            console.log('🔍 Checking Redis cache...');
            featuredProducts = await redis.get("featured_products");
            if (featuredProducts) {
                console.log('✅ Found in Redis cache');
                return res.json(JSON.parse(featuredProducts));
            }
        } else {
            console.log('⚠️ Redis not available, fetching from database');
        }

        // if not in redis or redis not available, fetch from mongodb
        console.log('🔍 Fetching from MongoDB...');
        featuredProducts = await Product.find({ isFeatured: true }).lean();
        
        console.log(`📊 Found ${featuredProducts ? featuredProducts.length : 0} featured products`);

        if (!featuredProducts || featuredProducts.length === 0) {
            console.log('⚠️ No featured products found, returning all products...');
            // إذا لم توجد منتجات مميزة، أرجع أول 6 منتجات
            featuredProducts = await Product.find({}).limit(6).lean();
            console.log(`📊 Returning ${featuredProducts.length} products as featured`);
        }

        // store in redis for future quick access (only if redis is available)
        if (redis && featuredProducts.length > 0) {
            await redis.set("featured_products", JSON.stringify(featuredProducts));
            console.log('✅ Cached in Redis');
        }

        res.json(featuredProducts);
    } catch (error) {
        console.log("❌ Error in getFeaturedProducts controller", error);
        console.log("❌ Error stack:", error.stack);
        res.status(500).json({ 
            message: "Server error", 
            error: process.env.NODE_ENV === 'development' ? error.message : "Internal server error" 
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category,
        });

        res.status(201).json(product);
    } catch (error) {
        console.log("Error in createProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("deleted image from cloduinary");
            } catch (error) {
                console.log("error deleting image from cloduinary", error);
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 4 },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    image: 1,
                    price: 1,
                },
            },
        ]);

        res.json(products);
    } catch (error) {
        console.log("Error in getRecommendedProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.json({ products });
    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductsCache();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

async function updateFeaturedProductsCache() {
    try {
        // The lean() method  is used to return plain JavaScript objects instead of full Mongoose documents. This can significantly improve performance

        const featuredProducts = await Product.find({ isFeatured: true }).lean();
        
        // Update Redis cache only if Redis is available
        if (redis) {
            await redis.set("featured_products", JSON.stringify(featuredProducts));
            console.log("✅ Updated featured products cache");
        } else {
            console.log("⚠️ Redis not available, skipping cache update");
        }
    } catch (error) {
        console.log("❌ Error in update cache function:", error.message);
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
        
    } catch (error) {
        console.log("Error in getProductById controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const { name, description, price, image, category } = req.body;

        let cloudinaryResponse = null;

        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.image = cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : product.image;
        product.category = category;

        await product.save();

        res.json(product);
    } catch (error) {
        console.log("Error in updateProduct controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const uploadProductImage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const { image } = req.body;

        if (image) {
            const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
            product.image = cloudinaryResponse.secure_url;
            await product.save();
            res.json(product);
        } else {
            res.status(400).json({ message: "No image provided" });
        }
    } catch (error) {
        console.log("Error in uploadProductImage controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteProductImage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`products/${publicId}`);
            product.image = "";
            await product.save();
            res.json(product);
        } else {
            res.status(400).json({ message: "No image to delete" });
        }
    } catch (error) {
        console.log("Error in deleteProductImage controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getProductImage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product && product.image) {
            res.redirect(product.image);
        } else {
            res.status(404).json({ message: "Image not found" });
        }
    } catch (error) {
        console.log("Error in getProductImage controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};