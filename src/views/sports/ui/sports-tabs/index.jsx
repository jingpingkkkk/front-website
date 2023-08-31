/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import useScreenWidth from '../../../../hooks/use-screen-width';
import menuImages from '../../../../components/common/exchange-sidemenu/menu-images';

function SportsTabs({ availableSports, onClick }) {
  const { isMobile, isTablet } = useScreenWidth();

  const perView = isMobile ? 3 : isTablet ? 7 : 9;

  const [step, setStep] = useState(0);
  const [sports, setSports] = useState(availableSports);
  const [sportId, setSportId] = useState(availableSports[0]?._id);

  // useEffect(() => {
  //   setSports(availableSports.slice(0, perView));
  // }, [availableSports, perView, width]);

  const onNext = () => {
    const newStep =
      availableSports.length - step + 1 === perView ? 0 : step + 1;
    setStep(newStep);
    setSports(availableSports.slice(newStep, newStep + perView));
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

  return (
    <div className="sport-tabs">
      {/* Prev */}
      <button type="button" className="arrow-tabs arrow-left" onClick={onPrev}>
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
                    <span className="totel me-0">{sport?.total || 0}</span>
                    <span className="out-of">{sport?.outOf || 0}</span>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Next */}
      <button type="button" className="arrow-tabs arrow-right" onClick={onNext}>
        <img src="images/arrow-down.svg" alt="right-arrow" />
      </button>
    </div>
  );
}

export default SportsTabs;
