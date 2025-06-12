
import {
  FaGithub,
  FaInstagram,
  FaSnapchatGhost,
  FaEnvelope,
  FaAddressCard

} from 'react-icons/fa';
import { FcSettings } from 'react-icons/fc';
import React from 'react';


const Footer = ({ isDark }) => {
  return (
    <footer
      id='footer'
      className={`border-gray-300 mt-16 h-full w-full bg-t-black border-t-2 border-t-black py-10 px-6 text-center ${
      isDark ? 'bg-gray-800' : 'bg-gray-100'  
      }`}
    >
      <div
      className={`text-2xl font-bold mb-4 ${
        isDark ? 'text-light' : 'text-dark'
      }`}
      >
      <h1 className={`text-2xl font-bold mb-4 ${
        isDark? 'text-light' : 'text-dark'
      }`}>
        Follow Us
      </h1>
     
      <h2
        className={`text-2xl font-bold mb-4 ${
        isDark ? 'text-light' : 'text-dark'
        }`}
      >
        This website was developed by Mohammed Saud Al-Romaihi. Feel free to reach out for any inquiries.
      </h2>
      </div>      <div className='relative inline-block mb-4 mt-4'>
      <button 
      onClick={() => window.open('/about', '_blank')}
        className='relative mr-12 z-10 inline-block bg-black text-white rounded-lg px-6 py-3 mb-4 hover:scale-105 transition-all duration-300'
      >
        <span className='flex flex-row justify-normal text-2xl pr-7'>
          <FaAddressCard className='mr-3 w-16' />
          About Me
        </span>
      </button>
      <div className='absolute z-0 top-0 left-0 right-0 bottom-0 rounded-lg opacity-70 filter blur-lg bg-button-gradient transition-all duration-1000'></div>
        
        <button
          as='a'
          href='mailto:alromaihi2224@gmail.com'
          className='relative z-10 inline-block bg-black text-white rounded-lg px-6 py-3 mb-4 hover:scale-105 transition-all duration-300'
        >
        <span className='flex flex-row justify-normal text-2xl pr-7'>
        <FaEnvelope className='mr-3 w-16' />
        Contact Me
          </span>
      </button>
      <div className='absolute z-0 top-0 left-0 right-0 bottom-0 rounded-lg opacity-70 filter blur-lg bg-button-gradient transition-all duration-1000'></div>
      </div>

      <div className='flex justify-center space-x-4 mb-4'>    
      <button href='#' className='text-gray-950 text-2xl hover:scale-110'>
        Support
      </button>
      </div>      <div className='flex justify-center space-x-4 mb-4 hover:scale-125'>
      <a
        href='https://github.com/Msr7799'
        target='_blank'
        rel='noopener noreferrer'
        className={`text-4xl ${
        isDark ? 'text-light' : 'text-dark'
        } text-5xl hover:bg-social-gradient hover:bg-clip-text hover:text-transparent hover:scale-110 transition-all duration-500 hover:filter hover:brightness-125 rounded-lg`}
      >
        <FaGithub />
      </a>
      <a
        href='https://instagram.com/Msr_99'
        target='_blank'
        rel='noopener noreferrer'
        className={`text-4xl ${
        isDark ? 'text-light' : 'text-dark'
        } text-5xl hover:bg-social-gradient hover:bg-clip-text hover:text-transparent hover:scale-110 transition-all duration-500 hover:filter hover:brightness-125 rounded-lg`}
      >
        <FaInstagram />
      </a>
      <a
        href='https://snapchat.com/Msr.5'
        target='_blank'
        rel='noopener noreferrer'
        className={`text-4xl ${
        isDark ? 'text-light' : 'text-dark'
        } text-5xl hover:bg-social-gradient hover:bg-clip-text hover:text-transparent hover:scale-110 transition-all duration-500 hover:filter hover:brightness-125 rounded-lg`}
      >
        <FaSnapchatGhost />
      </a>
      </div>

      <div className='text-gray-800'>
      © Copyright {new Date().getFullYear()}, All Rights Reserved
      </div>
         <div className='mt-2'>
         <a href='/privacy' className='text-black'>
         Privacy Policy
         </a>
         <span className='mx-2 text-black' >|</span>
         <a href='/terms' className='text-black font-bold'>
         Terms & Conditions
         </a>
      </div>
    </footer>
    );
};

export default Footer;
