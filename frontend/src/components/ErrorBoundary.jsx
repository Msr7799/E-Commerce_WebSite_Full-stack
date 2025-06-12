import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // تحديث الحالة بحيث يتم عرض UI الخطأ في العرض التالي
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // يمكنك أيضاً تسجيل الخطأ في خدمة التقارير هنا
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="text-red-500 w-16 h-16" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              حدث خطأ ما
            </h1>
            
            <p className="text-gray-300 mb-6">
              عذراً، حدث خطأ غير متوقع. يرجى إعادة تحميل الصفحة أو المحاولة مرة أخرى لاحقاً.
            </p>
            
            <button
              onClick={this.handleReload}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              إعادة تحميل الصفحة
            </button>
            
            {/* عرض تفاصيل الخطأ في بيئة التطوير فقط */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="text-gray-400 cursor-pointer hover:text-white">
                  تفاصيل الخطأ (للمطورين)
                </summary>
                <div className="mt-2 p-3 bg-gray-700 rounded text-sm text-red-300 overflow-auto max-h-40">
                  <div className="font-bold mb-2">الخطأ:</div>
                  <pre className="whitespace-pre-wrap">{this.state.error.toString()}</pre>
                  
                  {this.state.errorInfo && (
                    <>
                      <div className="font-bold mt-4 mb-2">معلومات إضافية:</div>
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

export default ErrorBoundary;
