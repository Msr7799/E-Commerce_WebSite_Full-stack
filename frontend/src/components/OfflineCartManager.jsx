import React, { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const OfflineCartManager = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState([]);
  const [showOfflineWarning, setShowOfflineWarning] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineWarning(false);
      
      // تنفيذ الإجراءات المؤجلة عند عودة الاتصال
      if (pendingActions.length > 0) {
        processPendingActions();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineWarning(true);
      toast.error('انقطع الاتصال بالإنترنت. ستحفظ تغييراتك محلياً.', {
        duration: 5000,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pendingActions]);

  const processPendingActions = async () => {
    if (pendingActions.length === 0) return;

    toast.loading('جاري مزامنة البيانات...', { id: 'sync' });

    try {
      // تنفيذ الإجراءات المؤجلة واحداً تلو الآخر
      for (const action of pendingActions) {
        await executeAction(action);
      }
      
      setPendingActions([]);
      toast.success('تم مزامنة جميع التغييرات بنجاح', { id: 'sync' });
    } catch (error) {
      console.error('خطأ في مزامنة البيانات:', error);
      toast.error('فشل في مزامنة بعض التغييرات', { id: 'sync' });
    }
  };

  const executeAction = async (action) => {
    // هنا يمكن تنفيذ الإجراءات المختلفة حسب النوع
    switch (action.type) {
      case 'ADD_TO_CART':
        // تنفيذ إضافة إلى السلة
        break;
      case 'REMOVE_FROM_CART':
        // تنفيذ حذف من السلة
        break;
      case 'UPDATE_QUANTITY':
        // تنفيذ تحديث الكمية
        break;
      default:
        console.warn('نوع إجراء غير مدعوم:', action.type);
    }
  };

  const addPendingAction = (action) => {
    setPendingActions(prev => [...prev, { ...action, timestamp: Date.now() }]);
  };

  // مزامنة يدوية
  const handleManualSync = () => {
    if (isOnline && pendingActions.length > 0) {
      processPendingActions();
    } else if (!isOnline) {
      toast.error('لا يوجد اتصال بالإنترنت');
    } else {
      toast.success('جميع البيانات محدثة');
    }
  };

  return (
    <div className="relative">
      {/* شريط التحذير عند انقطاع الاتصال */}
      {showOfflineWarning && (
        <div className="fixed top-0 left-0 right-0 bg-orange-600 text-white z-50 p-3 transition-transform duration-300">
          <div className="flex items-center justify-between max-w-screen-xl mx-auto">
            <div className="flex items-center gap-3">
              <WifiOff size={20} />
              <div>
                <span className="font-medium">وضع عدم الاتصال</span>
                <span className="text-sm opacity-90 ml-2">
                  - ستحفظ تغييراتك محلياً
                </span>
              </div>
            </div>
            
            {pendingActions.length > 0 && (
              <div className="flex items-center gap-2">
                <AlertCircle size={16} />
                <span className="text-sm">
                  {pendingActions.length} إجراء في الانتظار
                </span>
                <button
                  onClick={handleManualSync}
                  className="bg-orange-700 hover:bg-orange-800 px-3 py-1 rounded text-sm transition-colors flex items-center gap-1"
                  disabled={!isOnline}
                >
                  <RefreshCw size={14} />
                  مزامنة
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* المحتوى مع إضافة padding عند ظهور الشريط */}
      <div className={showOfflineWarning ? 'pt-16' : ''}>
        {React.cloneElement(children, {
          isOnline,
          addPendingAction,
          pendingActionsCount: pendingActions.length
        })}
      </div>
    </div>
  );
};

export default OfflineCartManager;
