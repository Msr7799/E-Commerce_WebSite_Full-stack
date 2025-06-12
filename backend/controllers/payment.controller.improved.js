import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import { stripe } from "../lib/stripe.js";
import { asyncHandler, AppError } from "../middleware/error.middleware.js";

export const createCheckoutSession = asyncHandler(async (req, res) => {
	const { products, couponCode } = req.body;

	// التحقق من صحة البيانات
	if (!Array.isArray(products) || products.length === 0) {
		throw new AppError("لا توجد منتجات في السلة", 400);
	}

	// التحقق من صحة بيانات المنتجات
	for (const product of products) {
		if (!product.name || !product.price || product.price <= 0) {
			throw new AppError(`بيانات المنتج "${product.name || 'غير محدد'}" غير صحيحة`, 400);
		}
		if (!product.quantity || product.quantity <= 0) {
			throw new AppError(`كمية المنتج "${product.name}" يجب أن تكون أكبر من صفر`, 400);
		}
	}

	let totalAmount = 0;

	const lineItems = products.map((product) => {
		const amount = Math.round(product.price * 100); // stripe wants cents
		totalAmount += amount * product.quantity;

		return {
			price_data: {
				currency: "usd",
				product_data: {
					name: product.name,
					images: product.image ? [product.image] : [],
				},
				unit_amount: amount,
			},
			quantity: product.quantity || 1,
		};
	});

	let coupon = null;
	if (couponCode) {
		coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
		if (!coupon) {
			throw new AppError("كود الخصم غير صحيح أو منتهي الصلاحية", 400);
		}
	}

	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			discounts: coupon
				? [
						{
							coupon: await createStripeCoupon(coupon.discountPercentage),
						},
				  ]
				: [],
			metadata: {
				userId: req.user._id.toString(),
				couponCode: couponCode || "",
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		});

		// إنشاء كوبون جديد إذا كان المبلغ كبيراً
		if (totalAmount >= 20000) {
			await createNewCoupon(req.user._id);
		}

		res.status(200).json({ 
			success: true,
			id: session.id, 
			totalAmount: totalAmount / 100 
		});
	} catch (stripeError) {
		console.error("Stripe error:", stripeError);
		throw new AppError("فشل في إنشاء جلسة الدفع. يرجى المحاولة مرة أخرى.", 500);
	}
});

export const checkoutSuccess = asyncHandler(async (req, res) => {
	const { sessionId } = req.body;

	if (!sessionId) {
		throw new AppError("معرف الجلسة مطلوب", 400);
	}

	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId);
		
		if (!session) {
			throw new AppError("جلسة الدفع غير موجودة", 404);
		}

		if (session.payment_status === "paid") {
			const products = JSON.parse(session.metadata.products);
			const newOrder = new Order({
				user: session.metadata.userId,
				products: products.map((product) => ({
					product: product.id,
					quantity: product.quantity,
					price: product.price,
				})),
				totalAmount: session.amount_total / 100, // convert from cents to dollars,
				stripeSessionId: sessionId,
			});
			
			await newOrder.save();

			res.status(200).json({
				success: true,
				message: "تم تأكيد عملية الشراء بنجاح",
				orderId: newOrder._id,
			});
		} else {
			throw new AppError("لم يتم تأكيد عملية الدفع", 400);
		}
	} catch (stripeError) {
		console.error("Stripe checkout success error:", stripeError);
		if (stripeError.type === 'StripeInvalidRequestError') {
			throw new AppError("معرف الجلسة غير صحيح", 400);
		}
		throw new AppError("خطأ في التحقق من عملية الدفع", 500);
	}
});

async function createStripeCoupon(discountPercentage) {
	try {
		const coupon = await stripe.coupons.create({
			percent_off: discountPercentage,
			duration: "once",
		});
		return coupon.id;
	} catch (error) {
		console.error("Error creating stripe coupon:", error);
		throw new AppError("فشل في تطبيق كود الخصم", 500);
	}
}

async function createNewCoupon(userId) {
	try {
		await Coupon.findOneAndDelete({ userId });

		const newCoupon = new Coupon({
			code: "GIFT" + Math.random().toString(36).substring(2, 15).toUpperCase(),
			discountPercentage: 10,
			userId: userId,
		});

		await newCoupon.save();
		return newCoupon;
	} catch (error) {
		console.error("Error creating new coupon:", error);
		// لا نرمي خطأ هنا لأن الشراء تم بنجاح والكوبون اختياري
	}
}
