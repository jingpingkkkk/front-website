/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';

const BannerSlider = () => {
  const { themeSettings } = useSelector((state) => state.themeSettings);
  const sliderImages = themeSettings?.bannerImages || ['images/banner1.png'];
  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
      <Carousel
        showArrows={false}
        showStatus={false}
        infiniteLoop
        showThumbs={false}
        autoPlay
        stopOnHover
        swipeable
        dynamicHeight
        emulateTouch
      >
        {sliderImages?.map((banner, index) => (
          <div className="px-1" key={index}>
            <img src={banner} alt="banner" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default BannerSlider;
