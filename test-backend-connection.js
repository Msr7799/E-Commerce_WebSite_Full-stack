// اختبار اتصال بسيط بـ Backend
console.log('🔧 Testing Backend connection...');

const testEndpoints = [
  'http://localhost:5000',
  'http://localhost:5000/api/auth/signup'
];

async function testConnection() {
  for (const url of testEndpoints) {
    try {
      console.log(`📡 Testing: ${url}`);
      
      const response = await fetch(url, {
        method: url.includes('/signup') ? 'POST' : 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: url.includes('/signup') ? JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        }) : undefined
      });
      
      console.log(`✅ ${url} - Status: ${response.status}`);
      
      if (response.status < 500) {
        const data = await response.text();
        console.log(`📄 Response: ${data.substring(0, 100)}...`);
      }
      
    } catch (error) {
      console.log(`❌ ${url} - Error: ${error.message}`);
    }
  }
}

testConnection();
