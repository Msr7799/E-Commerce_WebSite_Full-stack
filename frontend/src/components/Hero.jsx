import React from 'react';

const Hero = () => {
    return (
      <section className='relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden'>
        <img
          src='/header-full.svg'
          alt='Fullscreen'
          className='absolute inset-0 w-full h-full object-cover opacity-60'
        />
        <div className='relative z-10 text-center animate-fade-in'>
          <div className='space-y-8'>
            <div className='font-serif text-4xl md:text-5xl text-white font-light tracking-wide animate-slide-in-left'>
              Hello &amp; welcome
            </div>
            <div className='font-serif text-6xl md:text-8xl text-white font-bold tracking-wider bg-text-gradient bg-clip-text text-transparent shadow-custom-dark'>
              We are Titan
            </div>
            <a
              className='inline-block mt-8 px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-semibold tracking-wide hover:scale-105 hover:shadow-glow backdrop-blur-sm'
              href='#'
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    );
};

export default Hero;
