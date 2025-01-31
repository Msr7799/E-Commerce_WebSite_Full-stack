import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Lock, LogIn, LogOut, ShoppingCart, Search } from 'lucide-react';
import { FaSun, FaMoon } from 'react-icons/fa';

const NavbarShort = ({ user, isAdmin, logout, onSearch, isDarkMode, toggleTheme }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
      e.preventDefault();
      if (onSearch) {
        onSearch(searchQuery);
      }
      navigate(`/search/${searchQuery}`);
    };
    return (
        <nav id="nav" className='fixed h-20 top-4 left-1/2 mt-20 transform -translate-x-1/2  bg-gray-950 bg-opacity-55 backdrop-blur-3xl px-6 py-3 rounded-full flex items-center justify-between space-x-6 shadow-inherit shadow-2xl border-4 border-gray-300 w-full max-w-5xl'>
         
            <div className='flex items-center space-x-2'>
                <Link
                    to='/'
                    className={`text-2xl font-bold flex items-center space-x-2  hover:duration-700 hover:scale-125 ${isDarkMode ? 'text-gray-200' : 'text-stone-300'}`}
                >
                    <Home size={24} className='hover:backdrop-brightness-200 backdrop-brightness-100 transition duration-300' />
                </Link>
                <Link to='/' className='text-2xl font-bold text-stone-950 hover:text-gray-800 items-center space-x-2 flex'>
                    <img src={isDarkMode ? "/dark.gif" : "/light.gif"} alt="Fashion" className="w-20 h-22" />
                </Link>
            </div>
            
            <form onSubmit={handleSearch} className='flex items-center relative flex-grow max-w-xs'>
                <input
                    type='text'
                    className='w-full h-10 px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    type='submit'
                    className='absolute right-2 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-md p-2 transition duration-300'
                >
                    <Search size={20} />
                </button>
            </form>

            <div className='flex items-center space-x-6'>
                <button
                    className='relative w-14 h-8 bg-gray-700 rounded-full flex items-center transition duration-300 p-1'
                    onClick={toggleTheme}
                >
                    <div
                        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
                    />
                    <span className='absolute left-2 text-gray-400'>
                        {isDarkMode ? <FaMoon size={16} /> : <FaSun size={16} />}
                    </span>
                </button>

                {user && (
                    <Link
                        to='/cart'
                        className='w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-md transition duration-300'
                    >
                        <ShoppingCart size={20} />
                    </Link>
                )}

                {isAdmin && (
                    <Link
                        to='/secret-dashboard'
                        className='w-10 h-10 flex items-center justify-center bg-yellow-600 hover:bg-yellow-500 text-white rounded-full shadow-md transition duration-300'
                    >
                        <Lock size={20} />
                    </Link>
                )}

                {user ? (
                    <button
                        className='w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-md transition duration-300'
                        onClick={logout}
                    >
                        <LogOut size={20} />
                    </button>
                ) : (
                    <Link
                        to='/login'
                        className='w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-md transition duration-300'
                    >
                        <LogIn size={20} />
                    </Link>
                )}
            </div>
            
        </nav>
    );
};

export default NavbarShort;