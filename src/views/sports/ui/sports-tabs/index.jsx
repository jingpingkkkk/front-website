/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Slider from 'react-slick';
import menuImages from '../../../../components/common/exchange-sidemenu/menu-images';
import useScreenWidth from '../../../../hooks/use-screen-width';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SportsTabs({ availableSports, onClick }) {
  const { width } = useScreenWidth();

  const [sportId, setSportId] = useState(availableSports[0]?._id);

  const onClickSport = (id, name) => {
    setSportId(id);
    onClick(id, name);
  };

  let slidesToShow = 10; // Default for larger screens
  if (width <= 320) {
    slidesToShow = 3;
  } else if (width <= 425 && width > 320) {
    slidesToShow = 4;
  } else if (width < 1024) {
    slidesToShow = 8;
  } else if (width < 1280) {
    slidesToShow = 6;
  } else if (width < 1920) {
    slidesToShow = 9;
  } else if (width >= 1920 && width < 2560) {
    slidesToShow = 12;
  } else if (width <= 2560) {
    slidesToShow = 16;
  }

  return (
    <Slider
      speed={500}
      dots={false}
      infinite={false}
      draggable
      swipe
      slidesToShow={slidesToShow}
      slidesToScroll={2}
      autoplay={false}
      cssEase="linear"
      initialSlide={0}
      responsive={[
        {
          breakpoint: width,
          settings: {
            slidesToShow,
          },
        },
      ]}
      className="sport-tabs multiSportSlider"
    >
      <div className="nav-item item">
        <button
          type="button"
          style={{ all: 'unset', cursor: 'pointer' }}
          onClick={() => onClickSport(1, 'In Play')}
        >
          <div className="tab-main active">
            <img src={menuImages['In Play']} alt="In Play" />

            <div className="title-area">In Play</div>

            <div className="remark">
              <span className="totel me-0">0</span>
              <span className="out-of">0</span>
            </div>
          </div>
        </button>
      </div>
      {availableSports?.map((sport, index) => {
        const imgPath = menuImages[sport?.name] || '';
        return (
          <div className="nav-item item" key={`${sport.name} ${index}`}>
            <button
              type="button"
              style={{ all: 'unset', cursor: 'pointer' }}
              onClick={() => onClickSport(sport?._id, sport.name)}
            >
              <div
                className={`tab-main ${sport?._id === sportId ? 'active' : ''}`}
              >
                <img src={imgPath} alt={sport.name} />

                <div className="title-area">{sport?.name || ''}</div>

                <div className="remark">
                  <span className="totel me-0">
                    {sport?.getAllActiveEvent || 0}
                  </span>
                  <span className="out-of">{sport?.getAllLiveEvent || 0}</span>
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </Slider>
  );
}

export default SportsTabs;
