import express from "express";
import {
	createOrder,
	getUserOrders,
	getOrderById,
	cancelOrder,
	getAllOrders,
	updateOrderStatus
} from "../controllers/order.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// للمستخدمين المسجلين
router.post("/create", protectRoute, createOrder);
router.get("/my-orders", protectRoute, getUserOrders);
router.get("/:orderId", protectRoute, getOrderById);
router.patch("/:orderId/cancel", protectRoute, cancelOrder);

// للمشرفين فقط
router.get("/admin/all", protectRoute, adminRoute, getAllOrders);
router.patch("/admin/:orderId/status", protectRoute, adminRoute, updateOrderStatus);

export default router;
