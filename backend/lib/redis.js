import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// إنشاء اتصال Redis آمن مع معالجة الأخطاء
let redis;

try {
  if (process.env.UPSTASH_REDIS_URL) {
    redis = new Redis(process.env.UPSTASH_REDIS_URL);
    
    redis.on('connect', () => {
      console.log('✅ Connected to Redis successfully');
    });
    
    redis.on('error', (err) => {
      console.log('❌ Redis connection error:', err);
    });
  } else {
    console.log('⚠️ Redis URL not found, using in-memory storage');
    redis = null;
  }
} catch (error) {
  console.log('❌ Redis initialization error:', error);
  redis = null;
}

export { redis };
