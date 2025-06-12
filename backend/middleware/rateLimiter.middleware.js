import rateLimit from 'express-rate-limit';

// Rate limiting لتسجيل الدخول (مخفف للتطوير)
export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 دقائق بدلاً من 15
  max: 50, // 50 محاولة بدلاً من 5 للتطوير
  message: {
    error: 'تم تجاوز عدد محاولات تسجيل الدخول المسموح. يرجى المحاولة بعد 5 دقائق.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // تجاهل rate limiting في التطوير للـ localhost
    return process.env.NODE_ENV === 'development' && req.ip === '::1';
  }
});

// Rate limiting لإنشاء الحسابات (مخفف للتطوير)
export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // ساعة واحدة
  max: 10, // حد أقصى 10 حسابات جديدة لكل IP في الساعة (بدلاً من 3)
  message: {
    error: 'تم تجاوز عدد الحسابات المسموح إنشاؤها. يرجى المحاولة بعد ساعة.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // تجاهل rate limiting في التطوير للـ localhost
    return process.env.NODE_ENV === 'development' && req.ip === '::1';
  }
});

// Rate limiting عام للـ API (مخفف للتطوير)
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // حد أقصى 100 طلب لكل IP
  message: {
    error: 'تم تجاوز عدد الطلبات المسموح. يرجى المحاولة لاحقاً.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // تجاهل rate limiting في التطوير للـ localhost
    return process.env.NODE_ENV === 'development';
  }
});

// Rate limiting لعمليات الدفع
export const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // ساعة واحدة
  max: 10, // حد أقصى 10 عمليات دفع لكل IP في الساعة
  message: {
    error: 'تم تجاوز عدد عمليات الدفع المسموح. يرجى المحاولة بعد ساعة.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiting للبحث
export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // دقيقة واحدة
  max: 30, // حد أقصى 30 بحث في الدقيقة
  message: {
    error: 'تم تجاوز عدد عمليات البحث المسموح. يرجى الانتظار قليلاً.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Middleware مخصص للتحقق من الـ IP المشبوه
export const suspiciousActivityLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 ساعة
  max: 1000, // حد أقصى 1000 طلب في اليوم
  message: {
    error: 'تم اكتشاف نشاط مشبوه من هذا العنوان. تم حظره مؤقتاً.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // استخدام handler بدلاً من onLimitReached المهجور
  handler: (req, res, next, options) => {
    console.warn(`نشاط مشبوه من IP: ${req.ip}`, {
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString(),
      path: req.path
    });
    
    res.status(options.statusCode).json(options.message);
  }
});
