/* eslint-disable no-nested-ternary */
/* eslint-disable new-cap */
/* eslint-disable react/no-unstable-nested-components */
import 'jspdf-autotable';
import React from 'react';
import './casino.css';

function CasinoPageContent() {
  return (
    <div className="popular-games">
      <div className="popular-title">
        <div className="live-event-title">
          <div className="icon-holder-small">
            <div className="sports-icon top-trending" />
          </div>
          Trending Games
        </div>
      </div>
      <div className="position-relative popular-games-bg">
        <div className="popular-scroll">
          <div className="slider-scroll">
            <div className="slide-arrow">
              <div className="left-arrow">
                <img src="images/arrow-down.svg" alt="left-arrow" />
              </div>
              <div className="right-arrow">
                <i className="fas fa-chevron-right" />
              </div>
            </div>
          </div>
          <div className="populer-slider">
            <div className="item_main">
              <a href="/">
                <img
                  src="https://cdn.cloudd.live/vking/lobby/20210341162794.webp?v=1"
                  alt="Roulette"
                />
              </a>
              <div className="play-btn cursor-pointer">
                <h4>
                  <div className="sub-title"> Roulette </div>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CasinoPageContent;
