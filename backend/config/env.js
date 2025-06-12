// تحميل متغيرات البيئة مع معالجة مسارات متعددة
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// جرب عدة مسارات للعثور على .env
const envPaths = [
  path.join(process.cwd(), '.env'),
  path.join(__dirname, '../.env'),
  path.join(__dirname, '../../.env'),
  path.join(__dirname, '.env'),
];

let envLoaded = false;

for (const envPath of envPaths) {
  try {
    const result = dotenv.config({ path: envPath });
    if (!result.error) {
      console.log(`✅ Loaded .env from: ${envPath}`);
      envLoaded = true;
      break;
    }
  } catch (error) {
    console.log(`❌ Failed to load .env from: ${envPath}`);
  }
}

if (!envLoaded) {
  console.log('⚠️ No .env file found, using default values');
}

// تأكد من وجود المتغيرات الأساسية مع الاحتفاظ بالقيم المحملة
const requiredEnvVars = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce',
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'fallback_access_secret_key_very_long_and_secure',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'fallback_refresh_secret_key_very_long_and_secure',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173'
};

// تعيين المتغيرات في process.env فقط إذا لم تكن موجودة
for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!process.env[key] || process.env[key] === '') {
    process.env[key] = value;
    console.log(`🔧 Set fallback for ${key}`);
  }
}

// طباعة حالة المتغيرات
console.log('🔍 Environment variables status:');
for (const [key, defaultValue] of Object.entries(requiredEnvVars)) {
  const currentValue = process.env[key];
  const isOriginal = currentValue !== defaultValue;
  const status = isOriginal ? '✅ (loaded)' : '🔧 (fallback)';
  console.log(`  - ${key}: ${status}`);
  
  // طباعة القيمة الفعلية للتشخيص
  if (key === 'MONGO_URI') {
    console.log(`    Value: ${currentValue}`);
  }
}

export const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
};
