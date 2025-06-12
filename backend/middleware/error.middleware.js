// معالج الأخطاء المركزي للتطبيق
const errorHandler = (err, req, res, next) => {
  console.error('Error Stack:', err.stack);

  // خطأ في التحقق من صحة البيانات (Validation Error)
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      success: false,
      message: 'خطأ في التحقق من صحة البيانات',
      errors
    });
  }

  // خطأ في Cast (MongoDB ObjectId خاطئ)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'المعرف المرسل غير صحيح'
    });
  }

  // خطأ في المفتاح المكرر (Duplicate Key)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} موجود بالفعل`
    });
  }

  // خطأ في Token JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'رمز المصادقة غير صحيح'
    });
  }

  // انتهاء صلاحية Token
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'انتهت صلاحية جلسة المستخدم. يرجى تسجيل الدخول مرة أخرى'
    });
  }

  // أخطاء Stripe
  if (err.type && err.type.startsWith('Stripe')) {
    return res.status(400).json({
      success: false,
      message: 'خطأ في معالجة الدفع',
      error: err.message
    });
  }

  // أخطاء Cloudinary
  if (err.name === 'CloudinaryError') {
    return res.status(400).json({
      success: false,
      message: 'خطأ في رفع الصورة',
      error: err.message
    });
  }

  // خطأ عام في الخادم
  const statusCode = err.statusCode || 500;
  const message = err.message || 'خطأ في الخادم';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// معالج للمسارات غير الموجودة
const notFound = (req, res, next) => {
  const error = new Error(`المسار غير موجود - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// معالج async للأخطاء (لتجنب try-catch في كل controller)
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// فئة خطأ مخصصة
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export {
  errorHandler,
  notFound,
  asyncHandler,
  AppError
};
