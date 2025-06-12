import { useCallback } from 'react';
import toast from 'react-hot-toast';

/**
 * Hook مخصص لمعالجة الأخطاء بطريقة موحدة
 */
export const useErrorHandler = () => {
  const handleError = useCallback((error, context = '') => {
    console.error(`خطأ في ${context}:`, error);
    
    let errorMessage = 'حدث خطأ غير متوقع';
    
    if (error.response) {
      // خطأ من الخادم
      errorMessage = error.response.data?.message || 
                    error.response.data?.error || 
                    `خطأ في الخادم: ${error.response.status}`;
    } else if (error.request) {
      // خطأ في الشبكة
      errorMessage = 'فشل في الاتصال بالخادم. تحقق من اتصال الإنترنت.';
    } else if (error.message) {
      // أخطاء أخرى
      errorMessage = error.message;
    }
    
    toast.error(errorMessage);
    
    return {
      message: errorMessage,
      type: error.response ? 'server' : error.request ? 'network' : 'client',
      status: error.response?.status,
      originalError: error
    };
  }, []);

  const handleApiError = useCallback((error, defaultMessage = 'فشلت العملية') => {
    if (error.response?.status === 401) {
      toast.error('انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.');
      // يمكن إضافة logic لإعادة التوجيه لصفحة تسجيل الدخول
      return { shouldRedirectToLogin: true };
    }
    
    if (error.response?.status === 403) {
      toast.error('ليس لديك صلاحية لتنفيذ هذا الإجراء.');
      return { shouldRedirectToHome: true };
    }
    
    if (error.response?.status >= 500) {
      toast.error('خطأ في الخادم. يرجى المحاولة لاحقاً.');
      return { shouldRetry: true };
    }
    
    return handleError(error, defaultMessage);
  }, [handleError]);

  const handleAsyncOperation = useCallback(async (operation, options = {}) => {
    const {
      loadingMessage = 'جاري التحميل...',
      successMessage,
      errorContext = 'العملية',
      showLoading = true
    } = options;

    let loadingToast;
    
    try {
      if (showLoading) {
        loadingToast = toast.loading(loadingMessage);
      }
      
      const result = await operation();
      
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
      
      if (successMessage) {
        toast.success(successMessage);
      }
      
      return { success: true, data: result };
    } catch (error) {
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
      
      const errorInfo = handleApiError(error, errorContext);
      return { success: false, error: errorInfo };
    }
  }, [handleApiError]);

  return {
    handleError,
    handleApiError,
    handleAsyncOperation
  };
};
