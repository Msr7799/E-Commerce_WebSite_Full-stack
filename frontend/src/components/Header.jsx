import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({
  isDarkMode,
  toggleTheme,
  searchQuery,
  setSearchQuery,
  onSearch
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    onSearch(searchQuery);
  };
  return (
    <nav
      className={`bg-black bg-opacity-90 fixed top-0 w-full z-50 transition-all duration-400 ease-in-out ${
        isDarkMode ? 'bg-night' : 'bg-day'
      }`}
    >
      <div className='container mx-auto flex items-center justify-between p-4'>
        <div className='flex items-center'>
          <button
            className='navbar-toggle block lg:hidden text-white'
            type='button'
            onClick={toggleMenu}
          >
            <span className='sr-only'>Toggle navigation</span>
            <span className='block w-6 h-0.5 bg-white mb-1'></span>
            <span className='block w-6 h-0.5 bg-white mb-1'></span>
            <span className='block w-6 h-0.5 bg-white'></span>
          </button>
          <Link
            className='text-white text-2xl font-light tracking-widest ml-4'
            to='/'
          >
            Titan
          </Link>
        </div>
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:w-auto`}
          id='custom-collapse'
        >
          <ul className='flex flex-col lg:flex-row lg:ml-auto lg:space-x-6 text-white text-opacity-70'>
            <li>
              <Link
                className='hover:text-white transition-colors duration-125'
                to='/'
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className='hover:text-white transition-colors duration-125'
                to='#services'
                onClick={toggleMenu}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                className='hover:text-white transition-colors duration-125'
                to='#works'
                onClick={toggleMenu}
              >
                Works
              </Link>
            </li>
            <li>
              <Link
                className='hover:text-white transition-colors duration-125'
                to='#features'
                onClick={toggleMenu}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                className='hover:text-white transition-colors duration-125'
                to='#team'
                onClick={toggleMenu}
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                className='hover:text-white transition-colors duration-125'
                to='#blog'
                onClick={toggleMenu}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                className='hover:text-white transition-colors duration-125'
                to='#contact'
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className='flex items-center'>
          <button onClick={toggleTheme} className='text-white mr-4'>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <form onSubmit={handleSearchSubmit} className='flex items-center'>
            <input
              type='text'
              value={searchQuery}
              onChange={handleSearchChange}
              className='p-2 rounded bg-gray-800 text-white'
              placeholder='Search...'
            />
            <button type='submit' className='text-white ml-2'>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Header;
