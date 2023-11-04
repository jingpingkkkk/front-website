/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Slider from 'react-slick';
import menuImages from '../../../../components/common/exchange-sidemenu/menu-images';
import useScreenWidth from '../../../../hooks/use-screen-width';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SportsTabs({ availableSports, onClick }) {
  const {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isExtraLargeDesktop,
    isExtra2LargeDesktop,
    width,
  } = useScreenWidth();
  const perView = isMobile
    ? 3
    : isTablet
    ? 7
    : isDesktop
    ? 6
    : isLargeDesktop
    ? 6
    : isExtraLargeDesktop
    ? 9
    : isExtra2LargeDesktop
    ? 15
    : 11;

  const [sportId, setSportId] = useState(availableSports[0]?._id);

  const onClickSport = (id, name) => {
    setSportId(id);
    onClick(id, name);
  };

  return (
    <ul>
      <Slider
        speed={500}
        dots={false}
        infinite={false}
        draggable={false}
        swipe
        slidesToShow={perView}
        slidesToScroll={perView}
        autoplay={false}
        cssEase="linear"
        responsive={[
          {
            breakpoint: width,
            slidesToShow: perView,
            slidesToScroll: perView,
            infinite: false,
          },
        ]}
        className="sport-tabs multiSportSlider"
      >
        <li className="nav-item item">
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
        </li>
        {availableSports?.map((sport, index) => {
          const imgPath = menuImages[sport?.name] || '';
          return (
            <li className="nav-item item" key={`${sport.name} ${index}`}>
              <button
                type="button"
                style={{ all: 'unset', cursor: 'pointer' }}
                onClick={() => onClickSport(sport?._id, sport.name)}
              >
                <div
                  className={`tab-main ${
                    sport?._id === sportId ? 'active' : ''
                  }`}
                >
                  <img src={imgPath} alt={sport.name} />

                  <div className="title-area">{sport?.name || ''}</div>

                  <div className="remark">
                    <span className="totel me-0">
                      {sport?.getAllActiveEvent || 0}
                    </span>
                    <span className="out-of">
                      {sport?.getAllLiveEvent || 0}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </Slider>
    </ul>
  );
}

export default SportsTabs;
