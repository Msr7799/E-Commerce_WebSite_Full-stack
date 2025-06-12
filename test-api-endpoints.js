// اختبار API endpoints
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// اختبار إنشاء حساب
async function testSignup() {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('✅ Signup successful:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ Signup failed:', error.response?.data || error.message);
    return null;
  }
}

// اختبار تسجيل الدخول
async function testLogin() {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('✅ Login successful:', response.data);
    return response.data;
  } catch (error) {
    console.log('❌ Login failed:', error.response?.data || error.message);
    return null;
  }
}

// اختبار المنتجات المميزة
async function testFeaturedProducts() {
  try {
    const response = await axios.get(`${BASE_URL}/products/featured`);
    console.log('✅ Featured products:', response.data.length + ' products found');
    return response.data;
  } catch (error) {
    console.log('❌ Featured products failed:', error.response?.data || error.message);
    return null;
  }
}

// اختبار حالة الخادم
async function testServerHealth() {
  try {
    const response = await axios.get(`http://localhost:5000`);
    console.log('✅ Server is running');
    return true;
  } catch (error) {
    console.log('❌ Server is not responding');
    return false;
  }
}

// تشغيل الاختبارات
async function runTests() {
  console.log('🚀 Starting API tests...\n');
  
  // اختبار حالة الخادم
  await testServerHealth();
  
  // اختبار المنتجات المميزة
  await testFeaturedProducts();
  
  // اختبار إنشاء حساب
  await testSignup();
  
  // اختبار تسجيل الدخول
  await testLogin();
  
  console.log('\n🏁 Tests completed!');
}

// تشغيل الاختبارات بعد 3 ثوان
setTimeout(runTests, 3000);
