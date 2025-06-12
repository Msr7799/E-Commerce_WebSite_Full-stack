import { body, param, query, validationResult } from 'express-validator';

// middleware للتعامل مع أخطاء التحقق
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'بيانات غير صحيحة',
      errors: errors.array().map(error => ({
        field: error.path,
        message: getArabicErrorMessage(error.msg, error.path),
        value: error.value
      }))
    });
  }
  next();
};

// دالة لتحويل رسائل الخطأ إلى العربية
const getArabicErrorMessage = (message, field) => {
  const arabicMessages = {
    'Email is required': 'البريد الإلكتروني مطلوب',
    'Please provide a valid email': 'يرجى إدخال بريد إلكتروني صحيح',
    'Password is required': 'كلمة المرور مطلوبة',
    'Password must be at least 6 characters': 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    'Name is required': 'الاسم مطلوب',
    'Name must be at least 2 characters': 'الاسم يجب أن يكون حرفين على الأقل',
    'Invalid product ID': 'معرف المنتج غير صحيح',
    'Price must be a positive number': 'السعر يجب أن يكون رقم موجب',
    'Category is required': 'الفئة مطلوبة',
    'Quantity must be a positive integer': 'الكمية يجب أن تكون رقم صحيح موجب'
  };
  
  return arabicMessages[message] || message;
};

// قواعد التحقق من تسجيل الدخول
export const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// قواعد التحقق من التسجيل
export const signupValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters')
    .escape(),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  handleValidationErrors
];

// قواعد التحقق من المنتج
export const productValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters')
    .escape(),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters')
    .escape(),
  body('price')
    .isFloat({ min: 0.01 })
    .withMessage('Price must be a positive number'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .escape(),
  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean'),
  handleValidationErrors
];

// قواعد التحقق من إضافة منتج للسلة
export const addToCartValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
  handleValidationErrors
];

// قواعد التحقق من الكوبون
export const couponValidation = [
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Coupon code is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('Coupon code must be between 3 and 20 characters')
    .isAlphanumeric()
    .withMessage('Coupon code must contain only letters and numbers')
    .toUpperCase(),
  body('discountPercentage')
    .isFloat({ min: 1, max: 100 })
    .withMessage('Discount percentage must be between 1 and 100'),
  body('expirationDate')
    .isISO8601()
    .withMessage('Invalid expiration date')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Expiration date must be in the future');
      }
      return true;
    }),
  handleValidationErrors
];

// قواعد التحقق من البحث
export const searchValidation = [
  query('q')
    .trim()
    .notEmpty()
    .withMessage('Search query is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Search query must be between 1 and 100 characters')
    .escape(),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50'),
  handleValidationErrors
];

// قواعد التحقق من معرف MongoDB
export const mongoIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  handleValidationErrors
];
