import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		console.log('🔄 Attempting MongoDB connection...');
		console.log('📍 MongoDB URI:', process.env.MONGO_URI ? 'Found' : 'Missing');
		
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`✅ MongoDB connected: ${conn.connection.host}`);
		console.log(`📊 Database name: ${conn.connection.name}`);
		
		// اختبار إنشاء collection بسيط
		const testCollection = await conn.connection.db.collection('test').findOne({});
		console.log('🧪 Database connection test successful');
		
	} catch (error) {
		console.log("❌ Error connecting to MONGODB", error.message);
		console.log("❌ Full error:", error);
		process.exit(1);
	}
};
