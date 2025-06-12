import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// إنشاء طلب جديد (الدفع عند الاستلام)
export const createOrder = async (req, res) => {
	try {
		const { products, total, couponCode, shippingAddress, phoneNumber } = req.body;
		const userId = req.user._id;

		console.log('📝 Creating new order for user:', userId);

		// التحقق من البيانات المطلوبة
		if (!products || products.length === 0) {
			return res.status(400).json({ message: "لا توجد منتجات في الطلب" });
		}

		if (!shippingAddress || !phoneNumber) {
			return res.status(400).json({ message: "عنوان الشحن ورقم الهاتف مطلوبان" });
		}

		// التحقق من توفر المنتجات وحساب المجموع
		let calculatedTotal = 0;
		const orderProducts = [];

		for (const item of products) {
			const product = await Product.findById(item.product || item._id);
			
			if (!product) {
				return res.status(404).json({ message: `المنتج غير موجود: ${item.name}` });
			}

			// التحقق من المخزون
			if (product.countInStock < item.quantity) {
				return res.status(400).json({ 
					message: `المنتج ${product.name} غير متوفر بالكمية المطلوبة. المتوفر: ${product.countInStock}` 
				});
			}

			const price = product.price;
			const quantity = item.quantity;

			orderProducts.push({
				product: product._id,
				name: product.name,
				image: product.image,
				price: price,
				quantity: quantity
			});

			calculatedTotal += price * quantity;
		}

		// إنشاء الطلب
		const order = new Order({
			user: userId,
			products: orderProducts,
			totalAmount: calculatedTotal,
			couponCode: couponCode || null,
			shippingAddress,
			phoneNumber,
			paymentMethod: 'cash_on_delivery',
			paymentStatus: 'pending',
			orderStatus: 'pending'
		});

		await order.save();

		// تحديث مخزون المنتجات
		for (const item of orderProducts) {
			await Product.findByIdAndUpdate(
				item.product,
				{ $inc: { countInStock: -item.quantity } }
			);
		}

		console.log('✅ Order created successfully:', order._id);

		// إرجاع تفاصيل الطلب
		const populatedOrder = await Order.findById(order._id)
			.populate('user', 'name email')
			.populate('products.product', 'name image');

		res.status(201).json({
			message: "تم إنشاء الطلب بنجاح",
			order: populatedOrder
		});

	} catch (error) {
		console.log("❌ Error in createOrder controller:", error.message);
		res.status(500).json({ message: "خطأ في إنشاء الطلب", error: error.message });
	}
};

// الحصول على طلبات المستخدم
export const getUserOrders = async (req, res) => {
	try {
		const userId = req.user._id;
		
		const orders = await Order.find({ user: userId })
			.populate('products.product', 'name image')
			.sort({ createdAt: -1 });

		res.json(orders);
	} catch (error) {
		console.log("❌ Error in getUserOrders controller:", error.message);
		res.status(500).json({ message: "خطأ في جلب الطلبات", error: error.message });
	}
};

// الحصول على طلب محدد
export const getOrderById = async (req, res) => {
	try {
		const { orderId } = req.params;
		const userId = req.user._id;

		const order = await Order.findOne({ _id: orderId, user: userId })
			.populate('user', 'name email')
			.populate('products.product', 'name image price');

		if (!order) {
			return res.status(404).json({ message: "الطلب غير موجود" });
		}

		res.json(order);
	} catch (error) {
		console.log("❌ Error in getOrderById controller:", error.message);
		res.status(500).json({ message: "خطأ في جلب الطلب", error: error.message });
	}
};

// إلغاء طلب (للمستخدم)
export const cancelOrder = async (req, res) => {
	try {
		const { orderId } = req.params;
		const userId = req.user._id;

		const order = await Order.findOne({ _id: orderId, user: userId });

		if (!order) {
			return res.status(404).json({ message: "الطلب غير موجود" });
		}

		if (order.orderStatus !== 'pending') {
			return res.status(400).json({ message: "لا يمكن إلغاء هذا الطلب" });
		}

		// إرجاع المنتجات للمخزون
		for (const item of order.products) {
			await Product.findByIdAndUpdate(
				item.product,
				{ $inc: { countInStock: item.quantity } }
			);
		}

		order.orderStatus = 'cancelled';
		await order.save();

		res.json({ message: "تم إلغاء الطلب بنجاح", order });
	} catch (error) {
		console.log("❌ Error in cancelOrder controller:", error.message);
		res.status(500).json({ message: "خطأ في إلغاء الطلب", error: error.message });
	}
};

// للمشرف: الحصول على جميع الطلبات
export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find({})
			.populate('user', 'name email')
			.populate('products.product', 'name image')
			.sort({ createdAt: -1 });

		res.json(orders);
	} catch (error) {
		console.log("❌ Error in getAllOrders controller:", error.message);
		res.status(500).json({ message: "خطأ في جلب الطلبات", error: error.message });
	}
};

// للمشرف: تحديث حالة الطلب
export const updateOrderStatus = async (req, res) => {
	try {
		const { orderId } = req.params;
		const { orderStatus, paymentStatus } = req.body;

		const order = await Order.findById(orderId);

		if (!order) {
			return res.status(404).json({ message: "الطلب غير موجود" });
		}

		if (orderStatus) {
			order.orderStatus = orderStatus;
		}

		if (paymentStatus) {
			order.paymentStatus = paymentStatus;
		}

		await order.save();

		const updatedOrder = await Order.findById(orderId)
			.populate('user', 'name email')
			.populate('products.product', 'name image');

		res.json({ message: "تم تحديث حالة الطلب", order: updatedOrder });
	} catch (error) {
		console.log("❌ Error in updateOrderStatus controller:", error.message);
		res.status(500).json({ message: "خطأ في تحديث حالة الطلب", error: error.message });
	}
};
