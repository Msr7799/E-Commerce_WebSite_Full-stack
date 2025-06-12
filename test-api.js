// اختبار API endpoints
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// اختبار تسجيل مستخدم جديد
async function testSignup() {
  try {
    console.log('🧪 اختبار تسجيل مستخدم جديد...');
    
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      name: 'تست مستخدم',
      email: `test${Date.now()}@example.com`,
      password: 'test123456'
    });

    console.log('✅ تسجيل المستخدم نجح:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ خطأ في تسجيل المستخدم:', error.response?.data || error.message);
    return null;
  }
}

// اختبار تسجيل الدخول
async function testLogin() {
  try {
    console.log('🧪 اختبار تسجيل الدخول...');
    
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'test123456'
    });

    console.log('✅ تسجيل الدخول نجح:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ خطأ في تسجيل الدخول:', error.response?.data || error.message);
    return null;
  }
}

// اختبار الحصول على المنتجات
async function testGetProducts() {
  try {
    console.log('🧪 اختبار الحصول على المنتجات...');
    
    const response = await axios.get(`${BASE_URL}/products`);

    console.log('✅ الحصول على المنتجات نجح. عدد المنتجات:', response.data.products?.length || 0);
    return response.data;
  } catch (error) {
    console.log('❌ خطأ في الحصول على المنتجات:', error.response?.data || error.message);
    return null;
  }
}

// تشغيل جميع الاختبارات
async function runTests() {
  console.log('🚀 بدء اختبارات API...\n');
  
  await testGetProducts();
  console.log('');
  
  const user = await testSignup();
  console.log('');
  
  if (user) {
    await testLogin();
  }
  
  console.log('\n🏁 انتهاء الاختبارات');
}

runTests();
