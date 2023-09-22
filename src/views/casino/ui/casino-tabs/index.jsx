/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import useScreenWidth from '../../../../hooks/use-screen-width';

function CasinoTabs({ availableCasino, onClick }) {
  const { isMobile, isTablet } = useScreenWidth();

  const perView = isMobile ? 3 : isTablet ? 7 : 9;

  const [step, setStep] = useState(0);
  const [casino, setSports] = useState(availableCasino);
  const [casinoId, setCasinoId] = useState(availableCasino[0]?._id);

  // useEffect(() => {
  //   setSports(availableSports.slice(0, perView));
  // }, [availableSports, perView, width]);

  const onNext = () => {
    const newStep =
      availableCasino.length - step + 1 === perView ? 0 : step + 1;
    setStep(newStep);
    setSports(availableCasino.slice(newStep, newStep + perView));
  };

  const onPrev = () => {
    if (step === 0) return;
    const newStep = step - 1;
    setStep(newStep);
    setSports(availableCasino.slice(newStep, step + perView));
  };

  const onClickSport = (id, name) => {
    setCasinoId(id);
    onClick(id, name);
  };

  return (
    <div className="sport-tabs">
      {/* Prev */}
      <button type="button" className="arrow-tabs arrow-left" onClick={onPrev}>
        <img src="images/arrow-down.svg" alt="left-arrow" />
      </button>

      <ul id="taj_home_sports_list" className="nav nav-tabs">
        {casino?.map((casinoItem, index) => {
          return (
            <li className="nav-item item" key={`${casinoItem.name} ${index}`}>
              <button
                type="button"
                style={{ all: 'unset', cursor: 'pointer' }}
                onClick={() => onClickSport(casinoItem?._id, casinoItem.name)}
              >
                <div
                  className={`tab-main ${
                    casinoItem?._id === casinoId ? 'active' : ''
                  }`}
                >
                  <img src={casinoItem?.image} alt={casinoItem.name} />

                  <div className="title-area">{casinoItem?.name || ''}</div>

                  <div className="remark">
                    <span className="totel me-0">
                      {casinoItem?.activeEventCount || 0}
                    </span>
                    <span className="out-of">
                      {casinoItem?.allEventCount || 0}
                    </span>
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

export default CasinoTabs;
