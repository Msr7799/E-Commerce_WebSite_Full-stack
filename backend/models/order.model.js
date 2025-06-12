import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				image: {
					type: String,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				},
			},
		],
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		couponCode: {
			type: String,
			default: null,
		},
		shippingAddress: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		paymentMethod: {
			type: String,
			enum: ['cash_on_delivery', 'bank_transfer'],
			default: 'cash_on_delivery',
		},
		paymentStatus: {
			type: String,
			enum: ['pending', 'paid', 'failed'],
			default: 'pending',
		},
		orderStatus: {
			type: String,
			enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
			default: 'pending',
		},
		notes: {
			type: String,
			default: '',
		},
		// Legacy field for backwards compatibility
		stripeSessionId: {
			type: String,
			sparse: true, // Allow multiple null values
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
