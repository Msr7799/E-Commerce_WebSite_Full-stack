# 🛒 E-Commerce Website - Full Stack Application

![MERN Stack](MERN.png)

## 📋 نظرة عامة

متجر إلكتروني متطور مبني باستخدام تقنيات MERN Stack مع تحسينات متقدمة في الأمان والأداء ومعالجة الأخطاء.

## ✨ المميزات الرئيسية

### 🛡️ **الأمان والحماية**
- **Error Boundaries** متقدمة لمعالجة الأخطاء
- **Rate Limiting** لحماية الـ API من الهجمات
- **Input Validation** شاملة لجميع البيانات
- **CORS** و **Helmet** للحماية الإضافية
- **JWT Authentication** آمنة

### 🚀 **الأداء والتحسين**
- **Lazy Loading** للصور والمكونات
- **Code Splitting** لتحسين سرعة التحميل
- **Service Worker** للتخزين المؤقت
- **Redis Caching** للبيانات المتكررة
- **Image Optimization** تلقائية

### 🌐 **تجربة المستخدم**
- **Responsive Design** لجميع الأجهزة
- **Dark/Light Mode** قابل للتبديل
- **Real-time Updates** للسلة والطلبات
- **Offline Support** للعمل بدون إنترنت
- **Progressive Web App (PWA)** قابلية

### 💳 **نظام الدفع**
- **Stripe Integration** آمنة
- **Payment Error Handling** متقدمة
- **Order Tracking** في الوقت الفعلي
- **Receipt Generation** تلقائية

### 📊 **لوحة الإدارة**
- **Analytics Dashboard** شاملة
- **Product Management** سهلة
- **Order Management** متطورة
- **User Management** آمنة

## 🛠️ التقنيات المستخدمة

### Frontend
- **React 18** - مكتبة واجهة المستخدم
- **Vite** - أداة البناء السريعة
- **Tailwind CSS** - إطار التصميم
- **Framer Motion** - الحركات والانتقالات
- **Zustand** - إدارة الحالة
- **React Router** - التنقل
- **React Hot Toast** - الإشعارات
- **Lucide React** - الأيقونات

### Backend
- **Node.js** - بيئة تشغيل JavaScript
- **Express.js** - إطار الخادم
- **MongoDB** - قاعدة البيانات
- **Mongoose** - ODM لـ MongoDB
- **Redis** - التخزين المؤقت
- **Stripe** - معالجة المدفوعات
- **Cloudinary** - إدارة الصور
- **JWT** - المصادقة
- **bcryptjs** - تشفير كلمات المرور

### DevOps & Tools
- **ESLint** - فحص الكود
- **Prettier** - تنسيق الكود
- **Helmet** - أمان الخادم
- **Morgan** - تسجيل الطلبات
- **Express Rate Limit** - تحديد المعدل
- **Express Validator** - التحقق من البيانات

## 🚀 التشغيل السريع

### المتطلبات المسبقة
- Node.js (v18 أو أحدث)
- MongoDB (محلي أو Atlas)
- Redis (اختياري للتخزين المؤقت)
- حساب Stripe للمدفوعات
- حساب Cloudinary للصور

### 1. استنساخ المشروع
\`\`\`bash
git clone <repository-url>
cd E-Commerce_WebSite_main-Full-stack
\`\`\`

### 2. إعداد Backend

\`\`\`bash
cd backend
npm install
\`\`\`

إنشاء ملف \`.env\` في مجلد backend:
\`\`\`env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key
REDIS_URL=redis://localhost:6379

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Optional)
EMAIL_FROM=noreply@yourdomain.com
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
\`\`\`

### 3. إعداد Frontend

\`\`\`bash
cd frontend
npm install
\`\`\`

إنشاء ملف \`.env\` في مجلد frontend:
\`\`\`env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
\`\`\`

### 4. تشغيل التطبيق

#### تشغيل Backend
\`\`\`bash
cd backend
npm run dev
\`\`\`

#### تشغيل Frontend
\`\`\`bash
cd frontend
npm run dev
\`\`\`

التطبيق سيعمل على:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📁 هيكل المشروع

\`\`\`
E-Commerce_WebSite_main-Full-stack/
├── backend/
│   ├── controllers/          # منطق التحكم
│   ├── middleware/          # وسطاء الحماية والتحقق
│   ├── models/              # نماذج البيانات
│   ├── routes/              # مسارات API
│   ├── lib/                 # المكتبات المساعدة
│   └── server.js           # ملف الخادم الرئيسي
├── frontend/
│   ├── src/
│   │   ├── components/      # مكونات React
│   │   ├── pages/          # صفحات التطبيق
│   │   ├── stores/         # إدارة الحالة
│   │   ├── hooks/          # React Hooks مخصصة
│   │   ├── lib/            # المكتبات المساعدة
│   │   └── utils/          # دوال مساعدة
│   ├── public/             # الملفات العامة
│   └── package.json
└── README.md
\`\`\`

## 🔧 التحسينات المتقدمة

### معالجة الأخطاء
- **ErrorBoundary** عامة لحماية التطبيق
- **PaymentErrorBoundary** خاصة بعمليات الدفع
- **AdvancedErrorBoundary** مع تقارير تفصيلية
- **useErrorHandler** hook لمعالجة موحدة

### إدارة الحالة
- **Network Status** لمراقبة الاتصال
- **Offline Cart Manager** للعمل بدون إنترنت
- **State Manager** لحالات التحميل والأخطاء
- **Local Storage** آمن مع معالجة الأخطاء

### الأمان
- **Rate Limiting** متدرج حسب نوع الطلب
- **Input Validation** شاملة
- **CORS** محكوم
- **Helmet** للحماية الإضافية
- **JWT** آمنة مع انتهاء صلاحية

### الأداء
- **Image Lazy Loading** تلقائية
- **Code Splitting** ذكية
- **Redis Caching** للبيانات
- **Compression** للاستجابات
- **Minification** للأصول

## 🔐 الأمان

### Frontend Security
- XSS Protection عبر sanitization
- CSRF Protection
- Secure Cookie Handling
- Input Validation في الواجهة

### Backend Security
- SQL Injection Prevention
- NoSQL Injection Protection
- Rate Limiting
- Request Size Limiting
- Secure Headers

## 📈 مراقبة الأداء

### الملاحظات
- Response Time Monitoring
- Error Rate Tracking
- User Experience Metrics
- Server Resource Usage

### التحليلات
- User Behavior Analytics
- Sales Performance
- Product Popularity
- Geographic Distribution

## 🚀 النشر

### للإنتاج

#### Backend Deployment
\`\`\`bash
cd backend
npm run build
npm start
\`\`\`

#### Frontend Deployment
\`\`\`bash
cd frontend
npm run build
\`\`\`

### متغيرات البيئة للإنتاج
تأكد من تحديث متغيرات البيئة للإنتاج في \`.env.production\`

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء فرع للمميزة (\`git checkout -b feature/AmazingFeature\`)
3. Commit التغييرات (\`git commit -m 'Add some AmazingFeature'\`)
4. Push للفرع (\`git push origin feature/AmazingFeature\`)
5. فتح Pull Request

## 🐛 الإبلاغ عن الأخطاء

إذا وجدت خطأ، يرجى:
1. التحقق من Issues الموجودة
2. إنشاء Issue جديدة مع:
   - وصف مفصل للخطأ
   - خطوات إعادة الإنتاج
   - لقطات شاشة (إن أمكن)
   - معلومات البيئة

## 📝 الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## 👥 الفريق

- **Developer**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)

## 🙏 شكر وتقدير

- فريق React لإطار العمل الرائع
- فريق Node.js لبيئة التشغيل
- مجتمع Open Source للمكتبات المذهلة

---

**ملاحظة**: هذا المشروع للأغراض التعليمية والتجريبية. للاستخدام في الإنتاج، يرجى مراجعة إعدادات الأمان والأداء.
