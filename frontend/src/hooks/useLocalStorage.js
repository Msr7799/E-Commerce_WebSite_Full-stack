import { useState, useEffect } from 'react';

/**
 * Hook مخصص للتعامل مع Local Storage بشكل آمن
 * يتعامل مع الأخطاء ويوفر قيم افتراضية
 */
export const useLocalStorage = (key, initialValue) => {
  // دالة للحصول على القيمة من localStorage
  const getStorageValue = () => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`خطأ في قراءة ${key} من localStorage:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStorageValue);

  // دالة لحفظ القيمة
  const setValue = (value) => {
    try {
      // السماح بالقيم أو الدوال
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`خطأ في حفظ ${key} في localStorage:`, error);
    }
  };

  // دالة لحذف القيمة
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`خطأ في حذف ${key} من localStorage:`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

/**
 * Hook لحفظ واستعادة حالة النماذج
 */
export const useFormPersistence = (formId, initialFormData = {}) => {
  const [formData, setFormData, clearFormData] = useLocalStorage(
    `form_${formId}`,
    initialFormData
  );

  const updateField = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    updateField,
    resetForm,
    clearFormData
  };
};

/**
 * Hook للتعامل مع السلة محلياً في حالة عدم وجود اتصال
 */
export const useOfflineCart = () => {
  const [offlineCart, setOfflineCart, clearOfflineCart] = useLocalStorage('offline_cart', []);
  const [pendingActions, setPendingActions, clearPendingActions] = useLocalStorage('pending_cart_actions', []);

  const addToOfflineCart = (product) => {
    const existingItem = offlineCart.find(item => item._id === product._id);
    
    if (existingItem) {
      setOfflineCart(prev => 
        prev.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setOfflineCart(prev => [...prev, { ...product, quantity: 1 }]);
    }

    // إضافة الإجراء إلى قائمة الانتظار
    setPendingActions(prev => [...prev, {
      type: 'ADD_TO_CART',
      productId: product._id,
      timestamp: Date.now()
    }]);
  };

  const removeFromOfflineCart = (productId) => {
    setOfflineCart(prev => prev.filter(item => item._id !== productId));
    
    setPendingActions(prev => [...prev, {
      type: 'REMOVE_FROM_CART',
      productId,
      timestamp: Date.now()
    }]);
  };

  const updateOfflineCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromOfflineCart(productId);
      return;
    }

    setOfflineCart(prev => 
      prev.map(item => 
        item._id === productId 
          ? { ...item, quantity }
          : item
      )
    );

    setPendingActions(prev => [...prev, {
      type: 'UPDATE_QUANTITY',
      productId,
      quantity,
      timestamp: Date.now()
    }]);
  };

  const syncWithOnlineCart = async (onlineCartFunction) => {
    try {
      // تنفيذ جميع الإجراءات المؤجلة
      for (const action of pendingActions) {
        await onlineCartFunction(action);
      }
      
      // مسح البيانات المحلية بعد المزامنة الناجحة
      clearOfflineCart();
      clearPendingActions();
      
      return { success: true };
    } catch (error) {
      console.error('خطأ في مزامنة السلة:', error);
      return { success: false, error };
    }
  };

  return {
    offlineCart,
    pendingActions,
    addToOfflineCart,
    removeFromOfflineCart,
    updateOfflineCartQuantity,
    syncWithOnlineCart,
    clearOfflineCart,
    clearPendingActions
  };
};

/**
 * Hook للاحتفاظ بمحفوظات البحث
 */
export const useSearchHistory = (maxItems = 10) => {
  const [searchHistory, setSearchHistory, clearSearchHistory] = useLocalStorage('search_history', []);

  const addSearchTerm = (term) => {
    if (!term || term.trim() === '') return;

    const trimmedTerm = term.trim().toLowerCase();
    
    setSearchHistory(prev => {
      // إزالة المصطلح إذا كان موجوداً مسبقاً
      const filtered = prev.filter(item => item !== trimmedTerm);
      
      // إضافة المصطلح الجديد في المقدمة
      const updated = [trimmedTerm, ...filtered];
      
      // الاحتفاظ بالحد الأقصى للعناصر
      return updated.slice(0, maxItems);
    });
  };

  const removeSearchTerm = (term) => {
    setSearchHistory(prev => prev.filter(item => item !== term));
  };

  return {
    searchHistory,
    addSearchTerm,
    removeSearchTerm,
    clearSearchHistory
  };
};

export default useLocalStorage;
