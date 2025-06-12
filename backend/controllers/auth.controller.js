import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m",
	});

	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});

	return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
	try {
		// Redis is optional - app will work without it
		console.log(`📝 Storing refresh token for user: ${userId}`);
		// For now, we'll just log it since Redis is not available
	} catch (error) {
		console.log('❌ Error storing refresh token:', error);
	}
};

const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	});
	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
};

export const signup = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		console.log('📝 Signup attempt for:', email);
		console.log('📋 Request body:', { email, name, passwordProvided: !!password });
		
		// التحقق من البيانات المدخلة
		if (!email || !password || !name) {
			console.log('❌ Missing required fields');
			return res.status(400).json({ message: "جميع الحقول مطلوبة" });
		}

		// التحقق من طول كلمة المرور
		if (password.length < 6) {
			console.log('❌ Password too short');
			return res.status(400).json({ message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" });
		}

		console.log('🔍 Checking if user exists...');
		const userExists = await User.findOne({ email });

		if (userExists) {
			console.log('❌ User already exists');
			return res.status(400).json({ message: "المستخدم موجود بالفعل" });
		}
		
		console.log('✅ Creating new user...');
		const user = await User.create({ name, email, password });
		console.log('✅ User created successfully:', user._id);

		// authenticate
		console.log('🔑 Generating tokens...');
		const { accessToken, refreshToken } = generateTokens(user._id);
		await storeRefreshToken(user._id, refreshToken);

		console.log('🍪 Setting cookies...');
		setCookies(res, accessToken, refreshToken);

		console.log('✅ Signup successful for:', email);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log("❌ Error in signup controller", error);
		console.log("❌ Error stack:", error.stack);
		
		// معالجة أخطاء MongoDB المحددة
		if (error.name === 'ValidationError') {
			const validationErrors = Object.values(error.errors).map(err => err.message);
			return res.status(400).json({ 
				message: "خطأ في التحقق من البيانات", 
				errors: validationErrors 
			});
		}
		
		if (error.code === 11000) {
			return res.status(400).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
		}
		
		// خطأ عام
		res.status(500).json({ 
			message: "خطأ في الخادم", 
			error: process.env.NODE_ENV === 'development' ? error.message : "خطأ داخلي في الخادم" 
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			const { accessToken, refreshToken } = generateTokens(user._id);
			await storeRefreshToken(user._id, refreshToken);
			setCookies(res, accessToken, refreshToken);

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			try {
				const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
				// Redis is optional - app will work without it
				console.log(`📝 Logout for user: ${decoded.userId}`);
			} catch (tokenError) {
				console.log('❌ Invalid refresh token during logout:', tokenError.message);
			}
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "تم تسجيل الخروج بنجاح" });
	} catch (error) {
		console.log("❌ Error in logout controller", error.message);
		res.status(500).json({ message: "خطأ في الخادم", error: error.message });
	}
};

// this will refresh the access token
export const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) {
			return res.status(401).json({ message: "لم يتم توفير رمز التحديث" });
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		
		// Since we don't have Redis, we'll skip the stored token verification
		// In production, you should implement a proper token blacklist system
		console.log(`📝 Refreshing token for user: ${decoded.userId}`);

		const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 15 * 60 * 1000,
		});

		res.json({ message: "تم تحديث الرمز بنجاح" });
	} catch (error) {
		console.log("❌ Error in refreshToken controller", error.message);
		res.status(500).json({ message: "خطأ في الخادم", error: error.message });
	}
};

export const getProfile = async (req, res) => {
	try {
		console.log('📝 Getting profile for user:', req.user?._id);
		
		if (!req.user) {
			return res.status(401).json({ message: "غير مصرح له بالوصول" });
		}

		// إرجاع بيانات المستخدم
		res.json({
			_id: req.user._id,
			name: req.user.name,
			email: req.user.email,
			role: req.user.role,
		});
	} catch (error) {
		console.log("❌ Error in getProfile controller", error.message);
		res.status(500).json({ message: "خطأ في الخادم", error: error.message });
	}
};
