import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
// إعادة توجيه إلى order controller للدفع عند الاستلام
import { createOrder } from "../controllers/order.controller.js";

const router = express.Router();

// توجيه طلبات الدفع إلى نظام الطلبات الجديد
router.post("/create-checkout-session", protectRoute, createOrder);
router.post("/checkout-success", protectRoute, (req, res) => {
  res.json({ success: true, message: "نظام الدفع عند الاستلام نشط" });
});

export default router;
