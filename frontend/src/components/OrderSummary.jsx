import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight, ShoppingCart } from "lucide-react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import EnhancedLoadingSpinner from "./EnhancedLoadingSpinner";

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart, clearCart } = useCartStore();
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		if (isProcessingPayment) return; // منع النقرات المتعددة
		
		setIsProcessingPayment(true);
		
		try {
			// التحقق من وجود منتجات في السلة
			if (!cart || cart.length === 0) {
				toast.error('السلة فارغة. يرجى إضافة منتجات أولاً.');
				return;
			}

			// طلب بيانات الشحن من المستخدم
			const shippingAddress = prompt('يرجى إدخال عنوان الشحن:');
			if (!shippingAddress) {
				toast.error('عنوان الشحن مطلوب');
				return;
			}

			const phoneNumber = prompt('يرجى إدخال رقم الهاتف:');
			if (!phoneNumber) {
				toast.error('رقم الهاتف مطلوب');
				return;
			}

			// إنشاء طلب
			const orderData = {
				products: cart,
				total: total,
				couponCode: coupon ? coupon.code : null,
				shippingAddress: shippingAddress,
				phoneNumber: phoneNumber,
				paymentMethod: 'cash_on_delivery'
			};

			const response = await axios.post("/orders/create", orderData);
			
			if (response.data) {
				toast.success('تم إنشاء الطلب بنجاح! سيتم التواصل معك قريباً.');
				clearCart(); // إفراغ السلة
			}
			
		} catch (error) {
			console.error("خطأ في إنشاء الطلب:", error);
			
			if (error.response) {
				toast.error(error.response.data.message || "حدث خطأ أثناء إنشاء الطلب");
			} else if (error.request) {
				toast.error("فشل في الاتصال بالخادم. تحقق من اتصال الإنترنت.");
			} else {
				toast.error("حدث خطأ غير متوقع");
			}
		} finally {
			setIsProcessingPayment(false);
		}
	};

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-highlight2'>Order summary</p>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-300'>Original price</dt>
						<dd className='text-base font-medium text-white'>${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Savings</dt>
							<dd className='text-base font-medium text-highlight2'>-${formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-300'>Coupon ({coupon.code})</dt>
							<dd className='text-base font-medium text-highlight2'>-{coupon.discountPercentage}%</dd>
						</dl>
					)}
					<dl className='flex items-center justify-between gap-4 border-t border-gray-600 pt-2'>
						<dt className='text-base font-bold text-white'>Total</dt>
						<dd className='text-base font-bold text-highlight2'>${formattedTotal}</dd>
					</dl>
				</div>

				<motion.button
					className={`flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 transition-all duration-300 ${
						isProcessingPayment 
							? 'bg-emerald-400 cursor-not-allowed' 
							: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-300'
					}`}
					whileHover={!isProcessingPayment ? { scale: 1.05 } : {}}
					whileTap={!isProcessingPayment ? { scale: 0.95 } : {}}
					onClick={handlePayment}
					disabled={isProcessingPayment}
				>
					{isProcessingPayment ? (
						<div className="flex items-center gap-2">
							<EnhancedLoadingSpinner size="small" color="white" message="" />
							<span>جاري إنشاء الطلب...</span>
						</div>
					) : (
						<div className="flex items-center gap-2">
							<ShoppingCart size={18} />
							<span>إنشاء طلب (الدفع عند الاستلام)</span>
						</div>
					)}
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-400'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-highlight2 underline hover:text-highlight hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default OrderSummary;
