// تحميل متغيرات البيئة أولاً
import './config/env.js';
import { EventEmitter } from "events";

// زيادة MaxListeners لحل مشكلة EventEmitter
EventEmitter.defaultMaxListeners = 20;

// الآن استيراد باقي الوحدات بعد تحميل متغيرات البيئة
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import orderRoutes from "./routes/order.route.js";

import { connectDB } from "./lib/db.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import { apiLimiter, suspiciousActivityLimiter, loginLimiter, signupLimiter } from "./middleware/rateLimiter.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting - معطل مؤقتاً للتطوير
if (process.env.NODE_ENV === 'production') {
  app.use(apiLimiter);
  app.use(suspiciousActivityLimiter);
} else {
  console.log('⚠️ Rate limiting disabled in development mode');
}

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/orders", orderRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// معالجة الأخطاء - يجب أن تكون في النهاية
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
  connectDB();
});