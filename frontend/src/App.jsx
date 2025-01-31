import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// استيراد الصفحات الجديدة
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage"; // استيراد صفحة البحث
import NavbarShort from "./components/NavbarShort";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";
import FullScreenImageContainer from "./components/FullScreenImageContainer";
import { useProductStore } from "./stores/useProductStore";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutMePage from './pages/AboutMePage';

function App() {
    const { user, checkAuth, checkingAuth, logout } = useUserStore();
    const { getCartItems } = useCartStore();
    const { searchProducts } = useProductStore();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        navigate(`/search/${query}`);
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
        className={`relative min-h-screen overflow-hidden transition-colors duration-500`}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-1000 bg-fixed ${
            isDarkMode ? 'bg-night' : 'bg-day'
          }`}
        ></div>

        {location.pathname === '/' && (
          <FullScreenImageContainer
            imageSrc='/header-full.svg'
            className='opacity-20 z-30'
          />
        )}

        <div className='relative z-20'>
          <NavbarShort
            user={user}
            isAdmin={user?.role === 'admin'}
            logout={logout}
            onSearch={handleSearch}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
          />
        </div>

        <div
          className={`relative min-h-screen ${
            isDarkMode ? 'text-light' : 'text-dark'
          }`}
        >
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
              path='/search/:query'
              element={<SearchPage isDarkMode={isDarkMode} />}
            />{' '}
            {/* تعديل المسار لصفحة البحث */}
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
            <Route path='/terms' element={<TermsAndConditions />} />
            <Route path='/privacy' element={<PrivacyPolicy />} />
            <Route path='/about' element={<AboutMePage />} />
          </Routes>
          <Footer />
        </div>
        <Toaster position='top-right' />
      </div>
    );
}

export default App;