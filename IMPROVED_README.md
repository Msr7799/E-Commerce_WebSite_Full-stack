# متجر إلكتروني متكامل - E-Commerce Website

متجر إلكتروني حديث مبني بتقنيات MERN Stack مع تركيز خاص على الأمان والأداء وتجربة المستخدم.

## 🌟 المميزات الجديدة والتحسينات

### 🛡️ معالجة الأخطاء المتقدمة
- **Error Boundary**: حماية التطبيق من الأخطاء غير المتوقعة
- **PaymentErrorBoundary**: معالجة خاصة لأخطاء الدفع
- **معالج أخطاء مركزي**: في الـ Backend لإدارة جميع أنواع الأخطاء
- **Hook مخصص للأخطاء**: `useErrorHandler` لمعالجة موحدة للأخطاء

### 🌐 إدارة حالة الشبكة
- **NetworkStatus**: مراقبة حالة الاتصال بالإنترنت
- **OfflineCartManager**: إدارة السلة في وضع عدم الاتصال
- **مزامنة تلقائية**: عند عودة الاتصال

### 🎨 تحسينات UI/UX
- **EnhancedLoadingSpinner**: مؤشرات تحميل محسنة
- **StateManager**: إدارة حالات التحميل والأخطاء والبيانات الفارغة
- **رسائل خطأ مترجمة**: جميع الرسائل باللغة العربية
- **تحسين CustomCarousel**: معالجة أخطاء تحميل الصور

### 💾 إدارة البيانات المحلية
- **useLocalStorage Hook**: حفظ آمن للبيانات محلياً
- **useFormPersistence**: حفظ حالة النماذج
- **useOfflineCart**: إدارة السلة محلياً
- **useSearchHistory**: حفظ تاريخ البحث

### 🔒 تحسينات الأمان
- **متغيرات البيئة**: حماية مفاتيح Stripe
- **التحقق من صحة البيانات**: في الـ Frontend والـ Backend
- **معالجة أخطاء JWT**: رسائل واضحة لانتهاء الجلسة

## 🚀 التقنيات المستخدمة

### Frontend
- **React 18** - مكتبة واجهة المستخدم
- **Vite** - أداة البناء السريع
- **Tailwind CSS** - تصميم الواجهات
- **Framer Motion** - الحركات والانتقالات
- **React Router** - التنقل
- **Zustand** - إدارة الحالة
- **Axios** - طلبات HTTP
- **React Hot Toast** - الإشعارات
- **Lucide React** - الأيقونات

### Backend
- **Node.js** - بيئة التشغيل
- **Express.js** - إطار العمل
- **MongoDB** - قاعدة البيانات
- **Mongoose** - ODM لـ MongoDB
- **JWT** - المصادقة
- **Stripe** - معالجة المدفوعات
- **Cloudinary** - رفع الصور
- **Redis** - التخزين المؤقت

## 📁 هيكل المشروع المحسن

```
E-Commerce_WebSite_main-Full-stack/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ErrorBoundary.jsx ✨
│   │   │   ├── PaymentErrorBoundary.jsx ✨
│   │   │   ├── EnhancedLoadingSpinner.jsx ✨
│   │   │   ├── NetworkStatus.jsx ✨
│   │   │   ├── StateManager.jsx ✨
│   │   │   ├── OfflineCartManager.jsx ✨
│   │   │   └── ImprovedCustomCarousel.jsx ✨
│   │   ├── hooks/
│   │   │   ├── useErrorHandler.js ✨
│   │   │   └── useLocalStorage.js ✨
│   │   └── ...
│   └── .env.example ✨
└── backend/
    ├── middleware/
    │   └── error.middleware.js ✨
    ├── controllers/
    │   └── payment.controller.improved.js ✨
    └── ...
```

## 🛠️ التثبيت والتشغيل

### 1. استنساخ المشروع
```bash
git clone <repository-url>
cd E-Commerce_WebSite_main-Full-stack
```

### 2. تثبيت الـ Backend
```bash
cd backend
npm install
```

### 3. إعداد متغيرات البيئة للـ Backend
```bash
cp .env.example .env
```
وأضف المتغيرات المطلوبة:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
```

### 4. تثبيت الـ Frontend
```bash
cd ../frontend
npm install
```

### 5. إعداد متغيرات البيئة للـ Frontend
```bash
cp .env.example .env
```
وأضف:
```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=http://localhost:5000/api
```

### 6. تشغيل التطبيق
```bash
# تشغيل الـ Backend
cd backend
npm run dev

# في terminal آخر، تشغيل الـ Frontend
cd frontend
npm run dev
```

## 🔧 المميزات التقنية الجديدة

### Error Handling
```javascript
// استخدام ErrorBoundary
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// استخدام useErrorHandler
const { handleAsyncOperation } = useErrorHandler();

const result = await handleAsyncOperation(
  async () => await apiCall(),
  {
    loadingMessage: 'جاري التحميل...',
    successMessage: 'تم بنجاح!',
    errorContext: 'العملية'
  }
);
```

### حفظ البيانات محلياً
```javascript
// استخدام useLocalStorage
const [value, setValue, removeValue] = useLocalStorage('key', defaultValue);

// حفظ تاريخ البحث
const { searchHistory, addSearchTerm } = useSearchHistory();
```

### إدارة الحالات
```javascript
// استخدام StateManager
<StateManager
  loading={isLoading}
  error={error}
  empty={!data?.length}
  onRetry={refetch}
>
  <YourContent />
</StateManager>
```

## 🐛 معالجة الأخطاء الشائعة

### أخطاء الدفع
- **مفتاح Stripe مفقود**: رسالة واضحة للمستخدم
- **فشل في إنشاء الجلسة**: إعادة محاولة تلقائية
- **انقطاع الاتصال**: حفظ البيانات محلياً

### أخطاء الشبكة
- **عدم وجود اتصال**: وضع عدم الاتصال
- **timeout**: إعادة محاولة مع رسالة مفيدة
- **خطأ في الخادم**: رسالة واضحة وخيارات للمستخدم

## 📱 التوافق والأداء

- ✅ **متجاوب تماماً**: يعمل على جميع الأجهزة
- ✅ **سريع**: تحميل سريع مع Vite
- ✅ **آمن**: معالجة شاملة للأخطاء
- ✅ **يعمل بدون اتصال**: حفظ البيانات محلياً
- ✅ **مترجم**: واجهة باللغة العربية

## 🤝 المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى الـ branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📞 الدعم

إذا واجهت أي مشاكل أو لديك اقتراحات، يرجى فتح issue في المشروع.

---

**تم تطوير هذا المشروع بعناية فائقة لضمان الجودة والأمان والأداء العالي** 🚀
