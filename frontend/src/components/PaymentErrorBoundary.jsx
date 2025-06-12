import React from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

class PaymentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Payment Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // يمكن إرسال تقرير الخطأ إلى خدمة مراقبة الأخطاء هنا
    // مثل Sentry أو LogRocket
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="text-red-500 w-20 h-20" />
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-4">
              خطأ في عملية الدفع
            </h1>
            
            <p className="text-gray-300 mb-2">
              عذراً، حدث خطأ أثناء معالجة عملية الدفع.
            </p>
            
            <p className="text-gray-400 text-sm mb-8">
              لا تقلق، لم يتم خصم أي مبلغ من حسابك. يرجى المحاولة مرة أخرى.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={this.handleRetry}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
              >
                <RefreshCw size={20} />
                إعادة المحاولة
              </button>
              
              <Link
                to="/cart"
                className="w-full bg-gray-700 hover:bg-gray-600 text-blue-400 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
              >
                العودة إلى السلة
              </Link>
              
              <Link
                to="/"
                className="w-full bg-gray-600 hover:bg-gray-500 text-gray-200 font-bold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center gap-2"
              >
                <Home size={20} />
                الصفحة الرئيسية
              </Link>
            </div>
            
            {/* معلومات للدعم الفني */}
            <div className="mt-8 p-4 bg-gray-700 rounded-lg">
              <p className="text-gray-400 text-xs mb-2">
                إذا استمر الخطأ، يرجى التواصل مع الدعم الفني وإرفاق الكود التالي:
              </p>
              <code className="text-red-300 text-xs break-all">
                {this.state.error?.message || 'PAYMENT_ERROR_UNKNOWN'}
              </code>
            </div>
            
            {/* تفاصيل الخطأ للمطورين فقط */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-gray-400 cursor-pointer hover:text-white text-sm">
                  تفاصيل تقنية (للمطورين)
                </summary>
                <div className="mt-3 p-3 bg-gray-700 rounded text-xs text-red-300 overflow-auto max-h-40">
                  <div className="font-bold mb-2">الخطأ:</div>
                  <pre className="whitespace-pre-wrap mb-4">{this.state.error.toString()}</pre>
                  
                  {this.state.errorInfo && (
                    <>
                      <div className="font-bold mb-2">Stack Trace:</div>
                      <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                    </>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PaymentErrorBoundary;
