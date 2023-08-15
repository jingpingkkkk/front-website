/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

function SportsTabs({ availableSports, onClick }) {
  const allSports = [
    ...availableSports,
    ...availableSports,
    ...availableSports,
  ];

  const [step, setStep] = useState(availableSports.length);
  const [sports, setSports] = useState(allSports);

  const onNext = () => {
    const newStep =
      step === availableSports.length * 2 - 1
        ? availableSports.length
        : step + 1;
    setStep(newStep);
    setSports(allSports.slice(newStep, newStep + 8));
  };

  const onPrev = () => {
    const newStep =
      step - 1 < availableSports.length
        ? step + availableSports.length - 1
        : step - 1;
    setStep(newStep);
    setSports(allSports.slice(newStep, newStep + 8));
  };

  return (
    <div className="sport-tabs">
      <button type="button" className="arrow-tabs arrow-left" onClick={onPrev}>
        <img src="images/arrow-down.svg" alt="left-arrow" />
      </button>

      <ul id="taj_home_sports_list" className="nav nav-tabs">
        {sports.map((sport, index) => (
          <li className="nav-item item" key={`${sport.name} ${index}`}>
            <button
              type="button"
              style={{ all: 'unset', cursor: 'pointer' }}
              onClick={() => onClick(sport.id)}
            >
              <div className="tab-main">
                <img src={sport.image} alt={sport.name} />

                <div className="title-area">{sport.name}</div>

                <div className="remark">
                  <span className="totel me-0">{sport.total}</span>
                  <span className="out-of">{sport.outOf}</span>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <button type="button" className="arrow-tabs arrow-right" onClick={onNext}>
        <img src="images/arrow-down.svg" alt="right-arrow" />
      </button>
    </div>
  );
}

export default SportsTabs;
