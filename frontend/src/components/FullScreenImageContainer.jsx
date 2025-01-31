import React from 'react';

const FullscreenImageContainer = () => {
  return (
    <div className=' w-full relative'>
      <img
        src='/header-full.svg' // ضع رابط الصورة هنا
        alt='Fullscreen'
        className='object-cover w-full h-full'
      />
      <div className='absolute inset-0 bg-black opacity-10 flex items-center justify-center'>
        <h1 className='text-white absolute text-3xl font-bold right-11 z-40'>Welcome to Our Site</h1>
      </div>
    </div>
  );
};

export default FullscreenImageContainer;
