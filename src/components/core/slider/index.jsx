/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';

const BannerSlider = () => {
  const { themeSettings } = useSelector((state) => state.themeSettings);
  const sliderImages =
    themeSettings?.bannerImages
      ?.filter((item) => item.url !== '')
      .map((item) => item.url) || [];
  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
      {sliderImages?.length ? (
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
              <img
                src={banner}
                alt="banner"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = 'images/banner1.png';
                }}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        ''
      )}
    </div>
  );
};
export default BannerSlider;
