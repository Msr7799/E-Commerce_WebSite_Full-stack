import React, { useState, useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdvancedErrorBoundary = ({ children, fallback, onError }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);
  const [errorId, setErrorId] = useState(null);

  useEffect(() => {
    // إنشاء معرف فريد للخطأ
    if (hasError) {
      const id = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setErrorId(id);
      
      // إرسال تقرير الخطأ (في الإنتاج)
      if (process.env.NODE_ENV === 'production' && onError) {
        onError(error, errorInfo, id);
      }
    }
  }, [hasError, error, errorInfo, onError]);

  // معالجة الأخطاء غير المتوقعة
  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      setHasError(true);
      setError(new Error(`Unhandled Promise Rejection: ${event.reason}`));
    };

    const handleError = (event) => {
      console.error('Global error:', event.error);
      setHasError(true);
      setError(event.error);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  const handleReset = () => {
    setHasError(false);
    setError(null);
    setErrorInfo(null);
    setErrorId(null);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const copyErrorInfo = () => {
    const errorReport = {
      errorId,
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    navigator.clipboard.writeText(JSON.stringify(errorReport, null, 2))
      .then(() => {
        alert('تم نسخ معلومات الخطأ إلى الحافظة');
      })
      .catch(() => {
        console.log('فشل في نسخ معلومات الخطأ');
      });
  };

  if (hasError) {
    // إذا تم توفير fallback مخصص
    if (fallback) {
      return fallback(error, handleReset, errorId);
    }

    // العرض الافتراضي للخطأ
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl p-6">
          <div className="text-center mb-6">
            <AlertTriangle className="text-red-500 w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-2">
              حدث خطأ غير متوقع
            </h1>
            <p className="text-gray-300 mb-4">
              نعتذر عن هذا الإزعاج. تم تسجيل الخطأ وسيتم إصلاحه قريباً.
            </p>
            {errorId && (
              <p className="text-sm text-gray-400 mb-4">
                معرف الخطأ: <span className="font-mono">{errorId}</span>
              </p>
            )}
          </div>

          <div className="space-y-3 mb-6">
            <button
              onClick={handleReset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              المحاولة مرة أخرى
            </button>
            
            <button
              onClick={handleReload}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} />
              إعادة تحميل الصفحة
            </button>
            
            <Link
              to="/"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <Home size={18} />
              العودة للصفحة الرئيسية
            </Link>
          </div>

          {/* معلومات تقنية في بيئة التطوير */}
          {process.env.NODE_ENV === 'development' && error && (
            <details className="mb-4">
              <summary className="text-gray-400 cursor-pointer hover:text-white flex items-center gap-2">
                <Bug size={16} />
                تفاصيل تقنية (للمطورين)
              </summary>
              <div className="mt-3 p-3 bg-gray-700 rounded text-sm">
                <div className="mb-3">
                  <strong className="text-red-400">الخطأ:</strong>
                  <pre className="whitespace-pre-wrap text-red-300 mt-1">
                    {error.message}
                  </pre>
                </div>
                
                {error.stack && (
                  <div className="mb-3">
                    <strong className="text-yellow-400">Stack Trace:</strong>
                    <pre className="whitespace-pre-wrap text-yellow-300 mt-1 text-xs overflow-auto max-h-40">
                      {error.stack}
                    </pre>
                  </div>
                )}
                
                {errorInfo?.componentStack && (
                  <div>
                    <strong className="text-blue-400">Component Stack:</strong>
                    <pre className="whitespace-pre-wrap text-blue-300 mt-1 text-xs overflow-auto max-h-40">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}

          <div className="text-center">
            <button
              onClick={copyErrorInfo}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              نسخ معلومات الخطأ للدعم الفني
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

// HOC لتطبيق Error Boundary على مكون
export const withErrorBoundary = (Component, errorBoundaryProps = {}) => {
  return function WrappedComponent(props) {
    return (
      <AdvancedErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </AdvancedErrorBoundary>
    );
  };
};

export default AdvancedErrorBoundary;
