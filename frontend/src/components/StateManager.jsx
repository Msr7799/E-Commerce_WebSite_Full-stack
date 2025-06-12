import React from 'react';
import { AlertTriangle, RefreshCw, ShoppingBag, Inbox } from 'lucide-react';
import EnhancedLoadingSpinner from './EnhancedLoadingSpinner';

const StateManager = ({ 
  loading = false, 
  error = null, 
  empty = false, 
  children,
  loadingMessage = 'جاري التحميل...',
  errorMessage = 'حدث خطأ ما',
  emptyMessage = 'لا توجد عناصر',
  onRetry = null,
  emptyIcon: EmptyIcon = Inbox,
  className = ''
}) => {
  
  // حالة التحميل
  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <EnhancedLoadingSpinner 
          size="large" 
          message={loadingMessage}
          color="blue"
        />
      </div>
    );
  }
  
  // حالة الخطأ
  if (error) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center max-w-md">
          <AlertTriangle className="text-red-500 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">خطأ</h3>
          <p className="text-gray-300 mb-6">
            {typeof error === 'string' ? error : errorMessage}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <RefreshCw size={16} />
              إعادة المحاولة
            </button>
          )}
        </div>
      </div>
    );
  }
  
  // حالة فارغة
  if (empty) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="text-center max-w-md">
          <EmptyIcon className="text-gray-500 w-16 h-16 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">فارغ</h3>
          <p className="text-gray-500">
            {emptyMessage}
          </p>
        </div>
      </div>
    );
  }
  
  // عرض المحتوى العادي
  return children;
};

// مكونات مخصصة لحالات محددة
export const ProductsStateManager = ({ loading, error, products, children, onRetry }) => (
  <StateManager
    loading={loading}
    error={error}
    empty={!loading && !error && (!products || products.length === 0)}
    emptyMessage="لا توجد منتجات متاحة حالياً"
    emptyIcon={ShoppingBag}
    onRetry={onRetry}
  >
    {children}
  </StateManager>
);

export const CartStateManager = ({ loading, error, cartItems, children, onRetry }) => (
  <StateManager
    loading={loading}
    error={error}
    empty={!loading && !error && (!cartItems || cartItems.length === 0)}
    emptyMessage="سلة التسوق فارغة"
    emptyIcon={ShoppingBag}
    onRetry={onRetry}
  >
    {children}
  </StateManager>
);

export default StateManager;
