import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
export const Carousel = () => {
  const options = {
    items: 1,
    // rewind: true,
    autoplay: true,
    // autoWidth: true,
  };

  return (
    <>
      <OwlCarousel options={options} className="owl-theme" items={1}>
        <div className="item">
          <img alt="banner" src="images/banner1.png" />
        </div>
        <div className="item ">
          <img alt="banner" src="images/banner1.png" />
        </div>
        <div className="item ">
          <img alt="banner" src="images/banner1.png" />
        </div>
        <div className="item ">
          <img alt="banner" src="images/banner1.png" />
        </div>
        <div className="item ">
          <img alt="banner" src="images/banner1.png" />
        </div>
        <div className="item carousel-item">
          <img alt="banner" src="images/banner1.png" />
        </div>
      </OwlCarousel>
    </>
  );
};
