import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

import NavbarShort from "./components/NavbarShort";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
    const { user, checkAuth, checkingAuth, logout } = useUserStore();
    const { getCartItems } = useCartStore();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleSearch = (query) => {
        console.log("Search query:", query);
        // قم بمعالجة البحث هنا
    };

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if (!user) return;

        getCartItems();
    }, [getCartItems, user]);

    if (checkingAuth) return <LoadingSpinner />;

    return (
      <div
        className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
          isDarkMode ? 'text-dark bg-dark' : 'text-light bg-light'
        }`}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isDarkMode ? 'fade-in' : 'fade-out'
          } ${isDarkMode ? 'bg-night' : 'bg-day'}`}
        ></div>

        <div className='relative z-50 pt-20'>
          <NavbarShort
            user={user}
            isAdmin={user?.role === 'admin'}
            logout={logout}
            onSearch={handleSearch}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        </div>
        <div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16'>
          <Routes>
            <Route path='/' element={<HomePage isDarkMode={isDarkMode} />} />
            <Route
              path='/signup'
              element={!user ? <SignUpPage /> : <Navigate to='/' />}
            />
            <Route
              path='/login'
              element={!user ? <LoginPage /> : <Navigate to='/' />}
            />
            <Route
              path='/secret-dashboard'
              element={
                user?.role === 'admin' ? (
                  <AdminPage />
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
            <Route path='/category/:category' element={<CategoryPage />} />
            <Route path='/product/:id' element={<ProductPage />} />
            <Route
              path='/cart'
              element={user ? <CartPage /> : <Navigate to='/login' />}
            />
            <Route
              path='/purchase-success'
              element={
                user ? <PurchaseSuccessPage /> : <Navigate to='/login' />
              }
            />
            <Route
              path='/purchase-cancel'
              element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />}
            />
          </Routes>
        </div>
        <Toaster position="top-right" />
      </div>
    );
}

export default App;