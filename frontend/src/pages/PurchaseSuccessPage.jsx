import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);
	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				const response = await axios.post("/payments/checkout-success", {
					sessionId,
				});
				
				if (response.data.success) {
					clearCart();
					toast.success("تم تأكيد عملية الشراء بنجاح!");
				} else {
					throw new Error(response.data.message || "فشل في تأكيد عملية الشراء");
				}
			} catch (error) {
				console.error("خطأ في تأكيد عملية الشراء:", error);
				const errorMessage = error.response?.data?.message || error.message || "فشل في تأكيد عملية الشراء";
				setError(errorMessage);
				toast.error(errorMessage);
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			const errorMsg = "معرف الجلسة غير موجود في الرابط";
			setError(errorMsg);
			toast.error(errorMsg);
		}
	}, [clearCart]);
	if (isProcessing) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<LoadingSpinner />
			</div>
		);
	}

	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center px-4">
				<div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-6 text-center">
					<div className="text-red-500 text-6xl mb-4">⚠️</div>
					<h1 className="text-2xl font-bold text-red-400 mb-4">حدث خطأ</h1>
					<p className="text-gray-300 mb-6">{error}</p>
					<div className="space-y-3">
						<button
							onClick={() => window.location.reload()}
							className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
						>
							إعادة المحاولة
						</button>
						<Link
							to="/cart"
							className="w-full bg-gray-700 hover:bg-gray-600 text-blue-400 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
						>
							العودة إلى السلة
							<ArrowRight className="ml-2" size={18} />
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='h-screen flex mt-42 items-center justify-center px-4'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-blue-400 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-blue-400 mb-2'>
						Purchase Successful!
					</h1>

					<p className='text-gray-300 text-center mb-2'>
						Thank you for your order. {"We're"} processing it now.
					</p>
					<p className='text-blue-400 text-center text-sm mb-6'>
						Check your email for order details and updates.
					</p>
					<div className='bg-gray-700 rounded-lg p-4 mb-6'>
						<div className='flex items-center justify-between mb-2'>
							<span className='text-sm text-gray-400'>Order number</span>
							<span className='text-sm font-semibold text-blue-400'>#12345</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-gray-400'>Estimated delivery</span>
							<span className='text-sm font-semibold text-blue-400'>3-5 business days</span>
						</div>
					</div>

					<div className='space-y-4'>
						<button
							className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center'
						>
							<HandHeart className='mr-2' size={18} />
							Thanks for trusting us!
						</button>
						<Link
							to={"/"}
							className='w-full bg-gray-700 hover:bg-gray-600 text-blue-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center'
						>
							Continue Shopping
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;
