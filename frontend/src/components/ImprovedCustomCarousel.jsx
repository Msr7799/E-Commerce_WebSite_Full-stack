import React, { useEffect, useState } from 'react';
import { Carousel, initMDB } from "mdb-ui-kit";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { AlertTriangle } from 'lucide-react';

const CustomCarousel = () => {
  const [carouselError, setCarouselError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCarousel = async () => {
      try {
        const carouselElement = document.querySelector('#carouselBasicExample');
        
        if (!carouselElement) {
          throw new Error('عنصر الـ carousel غير موجود');
        }

        // التحقق من تحميل مكتبة MDB
        if (typeof Carousel === 'undefined') {
          throw new Error('مكتبة Carousel غير محملة');
        }

        // تهيئة الـ carousel
        const carouselInstance = new Carousel(carouselElement, {
          interval: 5000,
          pause: 'hover',
          wrap: true
        });
        
        await initMDB({ Carousel });
        setIsLoading(false);
        
      } catch (error) {
        console.error("خطأ في تهيئة الـ carousel:", error);
        setCarouselError(error.message);
        setIsLoading(false);
      }
    };

    initializeCarousel();

    // Cleanup function
    return () => {
      const carouselElement = document.querySelector('#carouselBasicExample');
      if (carouselElement) {
        const instance = Carousel.getInstance(carouselElement);
        if (instance) {
          instance.dispose();
        }
      }
    };
  }, []);

  // عرض رسالة خطأ إذا فشلت التهيئة
  if (carouselError) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-xl border-4 border-red-500">
        <div className="text-center">
          <AlertTriangle className="text-red-500 w-12 h-12 mx-auto mb-4" />
          <h3 className="text-white text-lg font-semibold mb-2">خطأ في تحميل المعرض</h3>
          <p className="text-gray-300 text-sm">{carouselError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // عرض حالة التحميل
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800 rounded-xl border-4 border-gray-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">جاري تحميل المعرض...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="carouselBasicExample" className="carousel slide border-4 rounded-xl border-highlight carousel-fade" 
    data-mdb-ride="carousel"
    data-mdb-interval="3000"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide-to="4"
          aria-label="Slide 5"
        ></button>
        <button
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide-to="5"
          aria-label="Slide 6"
        ></button>
        <button
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide-to="6"
          aria-label="Slide 7"
        ></button>
        <button
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide-to="7"
          aria-label="Slide 8"
        ></button>
      </div>

      {/* Inner */}
      <div className="carousel-inner rounded-xl">
        {/* First item */}
        <div className="carousel-item active">
          <img 
            src="/4.png" 
            className="d-block w-100" 
            alt="Slide 1" 
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg"; // صورة بديلة
              console.warn("فشل في تحميل الصورة:", e.target.src);
            }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>

        {/* Second item */}
        <div className="carousel-item">
          <img 
            src="/5.png" 
            className="d-block w-100" 
            alt="Slide 2" 
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
              console.warn("فشل في تحميل الصورة:", e.target.src);
            }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>

        {/* Third item */}
        <div className="carousel-item">
          <img 
            src="/6.png" 
            className="d-block w-100" 
            alt="Slide 3" 
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
              console.warn("فشل في تحميل الصورة:", e.target.src);
            }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>

        {/* Fourth item */}
        <div className="carousel-item">
          <img 
            src="/NewTshirt.png" 
            className="d-block w-100" 
            alt="Slide 4" 
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
              console.warn("فشل في تحميل الصورة:", e.target.src);
            }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Fourth slide label</h5>
            <p>Some representative placeholder content for the fourth slide.</p>
          </div>
        </div>

        {/* Fifth item */}
        <div className="carousel-item">
          <img 
            src="/New5.png" 
            className="d-block w-100" 
            alt="Slide 5" 
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
              console.warn("فشل في تحميل الصورة:", e.target.src);
            }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Fifth slide label</h5>
            <p>Some representative placeholder content for the fifth slide.</p>
          </div>
        </div>

        {/* Sixth item */}
        <div className="carousel-item">
          <img 
            src="/trousers.png" 
            className="d-block w-100" 
            alt="Slide 6" 
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
              console.warn("فشل في تحميل الصورة:", e.target.src);
            }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Sixth slide label</h5>
            <p>Some representative placeholder content for the sixth slide.</p>
          </div>
        </div>

        {/* Seventh item */}
        <div className="carousel-item">
          <img 
            src="/Perfume.png" 
            className="d-block w-100" 
            alt="Slide 7" 
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
              console.warn("فشل في تحميل الصورة:", e.target.src);
            }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Seventh slide label</h5>
            <p>Some representative placeholder content for the seventh slide.</p>
          </div>
        </div>

        {/* Eighth item */}
        <div className="carousel-item">
          <img 
            src="/apple.png" 
            className="d-block w-100" 
            alt="Slide 8" 
            loading="lazy"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
              console.warn("فشل في تحميل الصورة:", e.target.src);
            }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Eighth slide label</h5>
            <p>Some representative placeholder content for the eighth slide.</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-mdb-target="#carouselBasicExample"
        data-mdb-slide="prev"
      >
        <FaArrowLeft className="carousel-control-prev-icon text-highlight" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-mdb-target="#carouselBasicExample"
        data-mdb-slide="next"
      >
        <FaArrowRight className="carousel-control-next-icon text-highlight" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CustomCarousel;
