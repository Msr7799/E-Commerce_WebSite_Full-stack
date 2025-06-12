import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import toast from 'react-hot-toast';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        toast.success('تم استعادة الاتصال بالإنترنت', {
          duration: 3000,
          icon: '🌐'
        });
        setWasOffline(false);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      toast.error('انقطع الاتصال بالإنترنت', {
        duration: 5000,
        icon: '📡'
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [wasOffline]);

  if (isOnline) {
    return null; // لا نعرض شيئاً عندما يكون الاتصال متاحاً
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white z-50 p-3">
      <div className="flex items-center justify-center gap-2">
        <WifiOff size={20} />
        <span className="font-medium">لا يوجد اتصال بالإنترنت</span>
        <span className="text-sm opacity-90">- تحقق من اتصالك</span>
      </div>
    </div>
  );
};

export default NetworkStatus;
