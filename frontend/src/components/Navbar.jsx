import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ isDarkMode, toggleTheme }) => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";
    const { cart } = useCartStore();
    
    return (
        <header className='fixed top-0 left-0 w-full h-21 bg-gray-500 bg-opacity-90 backdrop-blur-sm shadow-xl z-40 transition-all duration-300 border-b-4 border-stone-950'>
            <div className='container mx-auto px-4 py-3'>
                <div className='flex flex-wrap justify-between items-center'>
                    <Link to='/' className='text-2xl font-bold text-stone-950 hover:text-gray-800 items-center  space-x-2 flex'>
                    <img src={isDarkMode ? "/dark.gif" : "/light.gif"} alt="Fashion" className="w-20 h-22" />

                    </Link>

                    <nav className='flex flex-wrap items-center gap-4'>
                        <Link
                            to={"/"}
                            className='relative group text-zinc-800 hover:text-cyan-400 transition duration-300 text-xl 
                                ease-in-out'
                        >
                            Home
                        </Link>

                        {user && (
                            <Link
                                to={"/cart"}
                                className='relative group text-zinc-800 hover:text-cyan-400 transition duration-300 text-xl 
                                ease-in-out'
                            >
                                <ShoppingCart className='inline-block mr-1 group-hover:text-blue-400' size={20} />
                                <span className='hidden sm:inline'>Cart</span>
                                {cart.length > 0 && (
                                    <span className='absolute -top-2 -left-2 bg-blue-500 text-white rounded-full px-2 py-0.5 
                                        text-xs group-hover:bg-blue-400 transition duration-300 ease-in-out'>
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                className='bg-gray-950 hover:bg-red-950 border border-zinc-900 hover:border-cyan-800 text-white py-2 px-4 
                                    rounded-lg flex no-underline items-center transition duration-300 ease-in-out'
                                to={"/secret-dashboard"}
                            >
                                <Lock className='inline-block mr-1' size={18} />
                                <span className='hidden sm:inline'>Dashboard</span>
                            </Link>
                        )}

                    

                        {user ? (
                            <button
                                className='bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
                                rounded-md flex items-center transition duration-300 ease-in-out'
                                onClick={logout}
                            >
                                <LogOut size={18} />
                                <span className='hidden sm:inline ml-2'>Log Out</span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    to={"/signup"}
                                    className='bg-gray-900 hover:bg-blue-950 text-white py-2 px-4 
                                    rounded-md flex items-center transition duration-300 ease-in-out'
                                >
                                    <UserPlus className='mr-2' size={18} />
                                    Sign Up
                                </Link>

                                <Link
                                    to={"/login"}
                                    className='bg-gray-200 hover:bg-blue-500 text-stone-900 py-2 px-4 
                                    rounded-md flex items-center transition duration-300 ease-in-out'
                                >
                                    <LogIn className='mr-2' size={18} />
                                    Login
                                </Link>
                              
                            </>
                            
                        )}
                        
                            <button
                            onClick={toggleTheme}
                            className='bg-gray-800 p-2 rounded-full text-gray-400 hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                        >
                            {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;