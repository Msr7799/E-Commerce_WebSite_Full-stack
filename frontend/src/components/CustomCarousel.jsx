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
    <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel">
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
      </div>

      {/* Inner */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/public/assets/newcolaction.png" alt="First slide" />
          <div className="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
          </div>
        </div>

        <div className="carousel-item">
          <img src="/public/assets/NEW5.png" className="d-block w-100" alt="Canyon at night" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
          </div>
        </div>

        <div className="carousel-item">
          <img src="/public/assets/2.png" className="d-block w-100" alt="Cliff above a stormy sea" />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
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
    
  );
};

export default CustomCarousel;