// اختبار قاعدة البيانات والمنتجات
import mongoose from 'mongoose';
import Product from './backend/models/product.model.js';
import dotenv from 'dotenv';

// تحميل متغيرات البيئة
dotenv.config();

async function testDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // احصاء عدد المنتجات
    const totalProducts = await Product.countDocuments();
    console.log(`📊 Total products: ${totalProducts}`);

    // احصاء المنتجات المميزة
    const featuredProducts = await Product.countDocuments({ isFeatured: true });
    console.log(`⭐ Featured products: ${featuredProducts}`);

    // عرض أول 5 منتجات
    const sampleProducts = await Product.find({}).limit(5).select('name price isFeatured');
    console.log('📋 Sample products:');
    sampleProducts.forEach(product => {
      console.log(`  - ${product.name} ($${product.price}) ${product.isFeatured ? '⭐' : ''}`);
    });

    // إذا لم توجد منتجات، أنشئ منتجات تجريبية
    if (totalProducts === 0) {
      console.log('📝 Creating sample products...');
      
      const sampleProductsData = [
        {
          name: "iPhone 13",
          price: 799,
          description: "Latest iPhone with amazing features",
          image: "/public/apple.png",
          category: "electronics",
          isFeatured: true,
          countInStock: 10
        },
        {
          name: "MacBook Pro",
          price: 1299,
          description: "Powerful laptop for professionals", 
          image: "/public/macPro.png",
          category: "electronics",
          isFeatured: true,
          countInStock: 5
        },
        {
          name: "T-Shirt",
          price: 29,
          description: "Comfortable cotton t-shirt",
          image: "/public/tshirt.avif",
          category: "clothing",
          isFeatured: true,
          countInStock: 50
        }
      ];

      await Product.insertMany(sampleProductsData);
      console.log('✅ Sample products created');
    }

  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

testDatabase();
