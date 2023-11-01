/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import menuImages from '../../../../components/common/exchange-sidemenu/menu-images';
import useScreenWidth from '../../../../hooks/use-screen-width';
import './sports.css';
import topNavItems from '../../../../components/core/topnav/api/top-nav-items';
import { LIVE_MENU_ITEMS } from '../../../../components/core/topnav/helpers/constants';

function SportsTabs({ availableSports, onClick }) {
  const {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isExtraLargeDesktop,
    isExtra2LargeDesktop,
  } = useScreenWidth();
  const navigate = useNavigate();

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

  const [step, setStep] = useState(0);
  const [sports, setSports] = useState(availableSports);
  const [sportId, setSportId] = useState(availableSports[0]?._id);

  // useEffect(() => {
  //   setSports(availableSports.slice(0, perView));
  // }, [availableSports, perView, width]);

  const onNext = () => {
    if (availableSports?.length > perView) {
      const nextIndex = (step + 1) % (availableSports.length - perView + 1);
      const newItems = availableSports.slice(nextIndex, nextIndex + perView);
      setStep(nextIndex);
      setSports(newItems);
    }
  };

  const onPrev = () => {
    if (step === 0) return;
    const newStep = step - 1;
    setStep(newStep);
    setSports(availableSports.slice(newStep, step + perView));
  };

  const onClickSport = (id, name) => {
    setSportId(id);
    onClick(id, name);
  };

  const onchangeMenu = (e, path) => {
    if (LIVE_MENU_ITEMS.includes(path)) {
      navigate(path);
    } else {
      e?.preventDefault();
    }
  };

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
      <div className="sport-tabs">
        {/* Prev */}
        <button
          type="button"
          className="arrow-tabs arrow-left"
          onClick={onPrev}
        >
          <img src="images/arrow-down.svg" alt="left-arrow" />
        </button>

        <ul id="taj_home_sports_list" className="nav nav-tabs">
          {sports?.map((sport, index) => {
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
        </ul>

        {/* Next */}
        <button
          type="button"
          className="arrow-tabs arrow-right"
          onClick={onNext}
        >
          <img src="images/arrow-down.svg" alt="right-arrow" />
        </button>
      </div>
    </>
  );
}

export default SportsTabs;
