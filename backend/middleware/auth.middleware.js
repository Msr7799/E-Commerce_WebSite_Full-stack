import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.accessToken;

		if (!accessToken) {
			console.log("❌ No access token provided");
			return res.status(401).json({ message: "غير مصرح له - لم يتم توفير رمز الوصول" });
		}

		try {
			const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
			console.log("✅ Token verified for user:", decoded.userId);
			
			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				console.log("❌ User not found:", decoded.userId);
				return res.status(401).json({ message: "المستخدم غير موجود" });
			}

			req.user = user;
			console.log("✅ User authenticated:", user.email);

			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				console.log("❌ Token expired");
				return res.status(401).json({ message: "غير مصرح له - انتهت صلاحية رمز الوصول" });
			}
			console.log("❌ Token verification failed:", error.message);
			throw error;
		}
	} catch (error) {
		console.log("❌ Error in Route middleware", error.message);
		return res.status(401).json({ message: "غير مصرح له - رمز وصول غير صالح" });
	}
};

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		console.log("✅ Admin access granted for:", req.user.email);
		next();
	} else {
		console.log("❌ Admin access denied for:", req.user?.email || "unknown user");
		return res.status(403).json({ message: "تم رفض الوصول - المشرفون فقط" });
	}
};


