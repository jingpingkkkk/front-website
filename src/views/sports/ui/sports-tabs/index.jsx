/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import menuImages from '../../../../components/common/exchange-sidemenu/menu-images';
import useScreenWidth from '../../../../hooks/use-screen-width';
import './sports.css';
import topNavItems from '../../../../components/core/topnav/api/top-nav-items';
import { LIVE_MENU_ITEMS } from '../../../../components/core/topnav/helpers/constants';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { setShouldLogin } from '../../../../redux/reducers/user-details';

function SportsTabs({ availableSports, onClick }) {
  const { width } = useScreenWidth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const [sportId, setSportId] = useState(0);
  const { liveEventsCount, totalEventsCount } = useSelector(
    (state) => state.sportsList,
  );

  // useEffect(() => {
  //   setSports(availableSports.slice(0, perView));
  // }, [availableSports, perView, width]);

  const onClickSport = (id, name) => {
    setSportId(id);
    onClick(id, name);
  };

  const onchangeMenu = (e, path) => {
    e.preventDefault();
    if (LIVE_MENU_ITEMS.includes(path)) {
      const notLoggedIn =
        !userDetails?.user?._id || !localStorage.getItem('userToken');
      if (notLoggedIn && path === '/casino') {
        dispatch(setShouldLogin(true));
        return;
      }
      navigate(path);
    } else {
      e?.preventDefault();
    }
  };

  let slidesToShow = 10; // Default for larger screens
  if (width <= 320) {
    slidesToShow = 3;
  } else if (width <= 480 && width > 320) {
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
    <>
      <div className="top-sport-tabs menu-tabs d-lg-none">
        <ul className="nav nav-tabs">
          {topNavItems.map((item) => (
            <li className="nav-item" key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${
                    isActive
                      ? 'router-link-exact-active router-link-active'
                      : ''
                  }`
                }
                onClick={(e) => {
                  onchangeMenu(e, item.path);
                }}
              >
                {item.image ? (
                  <img src={item.image} alt={item.label} />
                ) : (
                  <span>{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
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
            onClick={() => onClickSport(0, 'In Play')}
          >
            <div className={`tab-main ${sportId === 0 ? 'active' : ''}`}>
              <img src={menuImages['In Play']} alt="In Play" />

              <div className="title-area">In Play</div>

              <div className="remark">
                <span className="totel me-0">{totalEventsCount}</span>
                <span className="out-of">{liveEventsCount}</span>
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
            </div>
          );
        })}
      </Slider>
    </>
  );
}

export default SportsTabs;
