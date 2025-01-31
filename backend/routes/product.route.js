import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductsByCategory,
    getRecommendedProducts,
    toggleFeaturedProduct,
    updateProduct,
    uploadProductImage,
    deleteProductImage,
    getProductImage,
    getProductById,
    searchProducts, // تأكد من وجود هذا السطر
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.get("/search/:query", searchProducts); // تأكد من وجود هذا السطر
router.get("/:id", getProductById);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
router.patch("/:id/image", protectRoute, adminRoute, uploadProductImage);
router.delete("/:id/image", protectRoute, adminRoute, deleteProductImage);
router.get("/:id/image", getProductImage);
router.put("/:id", protectRoute, adminRoute, updateProduct);

export default router;