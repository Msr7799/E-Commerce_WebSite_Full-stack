// نظام الدفع المحسن - الدفع عند الاستلام
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import { asyncHandler, AppError } from "../middleware/error.middleware.js";

// إنشاء طلب جديد (الدفع عند الاستلام)
export const createCashOnDeliveryOrder = asyncHandler(async (req, res) => {
	const { products, couponCode, shippingAddress, phoneNumber } = req.body;

	// التحقق من صحة البيانات
	if (!Array.isArray(products) || products.length === 0) {
		throw new AppError("لا توجد منتجات في السلة", 400);
	}

	if (!shippingAddress || !phoneNumber) {
		throw new AppError("عنوان الشحن ورقم الهاتف مطلوبان", 400);
	}

	// التحقق من توفر المنتجات وحساب المجموع
	let totalAmount = 0;
	const orderProducts = [];

	for (const item of products) {
		const product = await Product.findById(item.product || item._id);
		if (!product) {
			throw new AppError(`المنتج غير موجود: ${item.name || item._id}`, 404);
		}

		if (product.quantity < item.quantity) {
			throw new AppError(`المخزون غير كافي للمنتج: ${product.name}`, 400);
		}

		const itemTotal = product.price * item.quantity;
		totalAmount += itemTotal;

		orderProducts.push({
			product: product._id,
			name: product.name,
			price: product.price,
			quantity: item.quantity,
			image: product.image
		});
	}

	// تطبيق كوبون الخصم إن وجد
	let discount = 0;
	let appliedCoupon = null;
	
	if (couponCode) {
		const coupon = await Coupon.findOne({ 
			code: couponCode, 
			userId: req.user._id, 
			isActive: true 
		});
		
		if (coupon) {
			discount = Math.round((totalAmount * coupon.discountPercentage) / 100);
			appliedCoupon = {
				code: coupon.code,
				discountPercentage: coupon.discountPercentage,
				discountAmount: discount
			};
		}
	}

	const finalAmount = totalAmount - discount;

	// إنشاء الطلب
	const newOrder = new Order({
		user: req.user._id,
		products: orderProducts,
		totalAmount: finalAmount,
		originalAmount: totalAmount,
		discountAmount: discount,
		coupon: appliedCoupon,
		paymentMethod: 'cash_on_delivery',
		paymentStatus: 'pending',
		orderStatus: 'pending',
		shippingAddress,
		phoneNumber,
		notes: req.body.notes || ''
	});

	await newOrder.save();

	// تقليل كمية المنتجات في المخزون
	for (const item of products) {
		await Product.findByIdAndUpdate(
			item.product || item._id,
			{ $inc: { quantity: -item.quantity } }
		);
	}

	// تعطيل الكوبون بعد الاستخدام إذا كان من النوع "single-use"
	if (appliedCoupon) {
		await Coupon.findOneAndUpdate(
			{ code: couponCode, userId: req.user._id },
			{ isActive: false }
		);
	}

	res.status(201).json({
		success: true,
		message: "تم إنشاء الطلب بنجاح",
		orderId: newOrder._id,
		orderNumber: newOrder.orderNumber,
		totalAmount: finalAmount,
		estimatedDelivery: "خلال 2-3 أيام عمل"
	});
});

// الحصول على تفاصيل الطلب
export const getOrderDetails = asyncHandler(async (req, res) => {
	const { orderId } = req.params;

	const order = await Order.findById(orderId)
		.populate('user', 'name email')
		.populate('products.product', 'name image category');

	if (!order) {
		throw new AppError("الطلب غير موجود", 404);
	}

	// التحقق من صلاحية المستخدم للوصول للطلب
	if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
		throw new AppError("غير مصرح بالوصول لهذا الطلب", 403);
	}

	res.json({
		success: true,
		order
	});
});

// الحصول على جميع طلبات المستخدم
export const getUserOrders = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	const orders = await Order.find({ user: req.user._id })
		.populate('products.product', 'name image')
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit);

	const totalOrders = await Order.countDocuments({ user: req.user._id });

	res.json({
		success: true,
		orders,
		pagination: {
			currentPage: page,
			totalPages: Math.ceil(totalOrders / limit),
			totalOrders,
			hasNext: page < Math.ceil(totalOrders / limit),
			hasPrev: page > 1
		}
	});
});

// تحديث حالة الطلب (للمشرفين فقط)
export const updateOrderStatus = asyncHandler(async (req, res) => {
	const { orderId } = req.params;
	const { orderStatus, paymentStatus, trackingNumber } = req.body;

	if (req.user.role !== 'admin') {
		throw new AppError("غير مصرح بهذا الإجراء", 403);
	}

	const order = await Order.findById(orderId);
	if (!order) {
		throw new AppError("الطلب غير موجود", 404);
	}

	// تحديث البيانات
	if (orderStatus) order.orderStatus = orderStatus;
	if (paymentStatus) order.paymentStatus = paymentStatus;
	if (trackingNumber) order.trackingNumber = trackingNumber;

	// إضافة تاريخ التسليم إذا تم تسليم الطلب
	if (orderStatus === 'delivered') {
		order.deliveredAt = new Date();
		if (paymentStatus !== 'paid') {
			order.paymentStatus = 'paid'; // تلقائياً عند التسليم للدفع عند الاستلام
		}
	}

	await order.save();

	res.json({
		success: true,
		message: "تم تحديث حالة الطلب بنجاح",
		order
	});
});

// إلغاء الطلب
export const cancelOrder = asyncHandler(async (req, res) => {
	const { orderId } = req.params;
	const { reason } = req.body;

	const order = await Order.findById(orderId);
	if (!order) {
		throw new AppError("الطلب غير موجود", 404);
	}

	// التحقق من صلاحية إلغاء الطلب
	if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
		throw new AppError("غير مصرح بإلغاء هذا الطلب", 403);
	}

	if (order.orderStatus === 'delivered' || order.orderStatus === 'cancelled') {
		throw new AppError("لا يمكن إلغاء الطلب في هذه المرحلة", 400);
	}

	// إرجاع المنتجات للمخزون
	for (const item of order.products) {
		await Product.findByIdAndUpdate(
			item.product,
			{ $inc: { quantity: item.quantity } }
		);
	}

	// تحديث حالة الطلب
	order.orderStatus = 'cancelled';
	order.cancelledAt = new Date();
	order.cancellationReason = reason || 'طلب من المستخدم';

	await order.save();

	res.json({
		success: true,
		message: "تم إلغاء الطلب بنجاح",
		order
	});
});

// إحصائيات الطلبات (للمشرفين)
export const getOrderStats = asyncHandler(async (req, res) => {
	if (req.user.role !== 'admin') {
		throw new AppError("غير مصرح بهذا الإجراء", 403);
	}

	const stats = await Order.aggregate([
		{
			$group: {
				_id: "$orderStatus",
				count: { $sum: 1 },
				totalAmount: { $sum: "$totalAmount" }
			}
		}
	]);

	const totalOrders = await Order.countDocuments();
	const totalRevenue = await Order.aggregate([
		{ $match: { paymentStatus: 'paid' } },
		{ $group: { _id: null, total: { $sum: "$totalAmount" } } }
	]);

	res.json({
		success: true,
		stats,
		totalOrders,
		totalRevenue: totalRevenue[0]?.total || 0
	});
});

// إنشاء كوبون جديد للمستخدم (عند الطلبات الكبيرة)
async function createNewCoupon(userId) {
	// حذف الكوبون القديم إن وجد
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 يوم
		userId: userId,
	});

	await newCoupon.save();
	return newCoupon;
}
