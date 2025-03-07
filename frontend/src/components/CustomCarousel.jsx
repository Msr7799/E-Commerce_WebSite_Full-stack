import React, { useEffect } from 'react';
import { Carousel, initMDB } from "mdb-ui-kit";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const CustomCarousel = () => {
  useEffect(() => {
    const carouselElement = document.querySelector('#carouselBasicExample');
    if (carouselElement) {
      new Carousel(carouselElement);
    }
    initMDB({ Carousel });
  }, []);

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
        <button
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide-to="8"
          aria-label="Slide 9"
        ></button>
        <button
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide-to="9" //New slide 1
          aria-label="Slide 10"
        ></button>
        <button
          type="button"
          data-mdb-target="#carouselBasicExample"
          data-mdb-slide-to="10" //New slide 2
          aria-label="Slide 11"
        ></button>
      </div>

      {/* Inner */}
      <div className="carousel-inner">
      <div id='colored-shadow' className=" rounded-xl shadow-lg ">  

        <div className="carousel-item active">
          <img
            src="/sale.png"
            className="d-block w-100 carousel-image"
            alt="First slide"
            style={{ height: "100%", maxHeight: "800px", objectFit: "cover", width: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="/New5.png"
            className="d-block w-100 carousel-image"
            alt="Canyon at night"
            style={{ height: "100%", maxHeight: "800px", objectFit: "cover", width: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="/2.png"
            className="d-block w-100 carousel-image"
            alt="Cliff above a stormy sea"
            style={{ height: "100%", maxHeight: "800px", objectFit: "cover", width: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="/home-decor.avif"
            className="d-block w-100 carousel-image"
            alt="Home Decor"
            style={{ height: "100%", maxHeight: "800px", objectFit: "cover", width: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Fourth slide label</h5>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="/home-decor.avif"
            className="d-block w-100 carousel-image"
            alt="Cliff above a stormy sea"
            style={{ height: "100%", maxHeight: "800px", objectFit: "cover", width: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Fifth slide label</h5>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="/apple.png"
            className="d-block w-100 carousel-image"
            alt="Sample slide"
            style={{ height: "100%", maxHeight: "800px", objectFit: "cover", width: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Sixth slide label</h5>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="/6.png"
            className="d-block w-100 carousel-image"
            alt="Sample slide"
            style={{ height: "100%", maxHeight: "800px", objectFit: "cover", width: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Seventh slide label</h5>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="/5.png"
            className="d-block w-100 carousel-image"
            alt="Sample slide"
            style={{ height: "100%", maxHeight: "800px", objectFit: "cover", width: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Eighth slide label</h5>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src="/4.png"
            className="d-block w-100 carousel-image"
            alt="Sample slide"
            style={{ height: "100%", maxHeight: "800px", objectFit: "cover", width: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Ninth slide label</h5>
          </div>
        </div>
        
        {/* New Slide 1 */}
        <div className="carousel-item">
          <img
            src="/E-comm.png"
            className="d-block w-100 carousel-image"
            alt="Sample slide"
            style={{ height: "100%", maxHeight: "800px", objectFit: "cover", width: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Tenth slide label</h5>
          </div>
        </div>

        {/* New Slide 2 */}
        <div className="carousel-item">
          <img
            src="/header-full.svg"
            className="d-block w-100 carousel-image"
            alt="Sample slide"
            style={{ height: "100%", maxHeight: "800px", objectFit: "cover", width: "100%" }}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Eleventh slide label</h5>
          </div>
        </div>    
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
        <FaArrowLeft className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
        <FaArrowRight className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    </div>
  );
};

export default CustomCarousel;