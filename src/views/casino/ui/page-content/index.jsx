/* eslint-disable no-nested-ternary */
/* eslint-disable new-cap */
/* eslint-disable react/no-unstable-nested-components */
import 'jspdf-autotable';
import React from 'react';
import './casino.css';
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import Slider from 'react-slick';
import useScreenWidth from '../../../../hooks/use-screen-width';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function CasinoPageContent() {
  const { width } = useScreenWidth();

  let slidesToShow = 10; // Default for larger screens
  if (width <= 320) {
    slidesToShow = 3;
  } else if (width <= 480 && width > 320) {
    slidesToShow = 3;
  } else if (width < 1024) {
    slidesToShow = 7;
  } else if (width < 1280) {
    slidesToShow = 6;
  } else if (width < 1920) {
    slidesToShow = 7;
  } else if (width >= 1920 && width < 2560) {
    slidesToShow = 12;
  } else if (width <= 2560) {
    slidesToShow = 16;
  }

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
          <div className="populer-slider">
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
              arrows
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div className="item_main" key={i}>
                  <a href="/">
                    <img src="/images/roulette.jpg" alt="Roulette" />
                  </a>
                  <div className="play-btn cursor-pointer">
                    <h4>
                      <div className="sub-title"> Roulette </div>
                    </h4>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div className="container-fluid pb-2 mb-3 dark-bg all-casinos">
        <div className="col-md-12 top-content m-0">
          <div className="top-title col-xl-9 col-sm-12 col-12">
            <button type="button" className="active">
              <span className="txt">All</span>
            </button>
            <button type="button" className="">
              <span className="txt">New</span>
            </button>
            <button type="button" className="">
              <span className="txt">Popular</span>
            </button>
            <button type="button" className="">
              <span className="txt">Live</span>
            </button>
            <button type="button" className="">
              <span className="txt">Virtual</span>
            </button>
          </div>

          <ul className="right d-flex game-providers col-xl-3 col-sm-12 col-12">
            <li className="all_providers">
              <UncontrolledDropdown>
                <DropdownToggle caret className="game-dropdown">
                  All Provider
                </DropdownToggle>
                <DropdownMenu>
                  <li className="collection-item">
                    <span className="title providers"> Supernowa </span>
                  </li>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
            <li className="all_providers me-0">
              <UncontrolledDropdown>
                <DropdownToggle caret className="game-dropdown">
                  All Games
                </DropdownToggle>
                <DropdownMenu>
                  <li className="collection-item">
                    <img
                      alt="All Games"
                      loading="lazy"
                      className="responsive-img"
                      src="/images/poker20.jpg"
                    />
                    <span className="title providers"> game 1 </span>
                  </li>
                </DropdownMenu>
              </UncontrolledDropdown>
            </li>
          </ul>
        </div>
        <div className="row portfolio">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div className="port-content" key={i}>
              <div className="port-inner">
                <div className="port-inner">
                  <div className="thumb">
                    <img
                      loading="lazy"
                      className="img-fluid"
                      src="/images/poker20.jpg"
                      alt="Teen Patti"
                    />
                  </div>
                  <div className="port-btn content">
                    <h4>
                      <a href="/">Teen Patti</a>
                      <div className="sub-title"> Supernowa </div>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CasinoPageContent;
