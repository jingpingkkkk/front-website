/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import Marquee from 'react-fast-marquee';
import { Carousel } from 'react-responsive-carousel';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import UpcommingMatches from '../upcomming-matches';
import { getRequest } from '../../../../api';
import { setLoginPopup } from '../../../../redux/reducers/login-popup';

function SportPageContent() {
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const [allCasino, setAllCasino] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const getUpcomingEvents = async () => {
    try {
      const result = await getRequest('event/upcomingEvent', false);
      if (result?.success) {
        setEvents(result?.data?.details || []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getLiveCasino = async () => {
    try {
      const result = await getRequest('casino/allCasino', false);
      if (result?.success) {
        setAllCasino(result?.data?.details || []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getFantasyGames = async () => {
    try {
      const result = await getRequest('casinoGame/showFavouriteGame', false);
      if (result?.success) {
        setAllGames(result?.data?.details || []);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const classNameRef = useRef('');
  const checkLogin = () => {
    const item = JSON.parse(localStorage.getItem('user'));
    if (!item) {
      classNameRef.current = 'login-hover';
      return false;
    }
    return true;
  };
  const openPage = (link = '') => {
    if (!checkLogin()) {
      dispatch(setLoginPopup(true));
    } else {
      window.location.href = `${link}`;
    }
  };
  useEffect(() => {
    getUpcomingEvents();
    getLiveCasino();
    getFantasyGames();
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="d-flex new-container">
        <div className="w-50 d-flex mx-2 upcoming-fixure">
          <div className="fixure-title">Upcoming Fixture</div>
          <div className="fixure-box-container">
            <Carousel
              showArrows={false}
              showThumbs={false}
              showStatus={false}
              showIndicators={false}
              infiniteLoop
              autoPlay
              stopOnHover
              swipeable
              dynamicHeight
              emulateTouch
              axis="vertical"
              verticalSwipe="natural"
            >
              {events?.length &&
                events.map((event) => {
                  return (
                    <div className="fixure-box" key={event?._id}>
                      <div>{event?.name || ''} </div>
                      <div>
                        {event?.matchDate
                          ? moment(event?.matchDate).format(
                              'DD/MM/YYYY HH:mm:ss (UTCZ)',
                            )
                          : ''}
                      </div>
                    </div>
                  );
                })}
            </Carousel>
          </div>
        </div>
        <div className="w-50 marqueee-row custom-buttton ">
          <Marquee>
            <div className="left-text py-1">
              COUNTY CHAMPIONSHIP DIVISION 1 &lt; MIDDLESEX V NORTHAMPTONSHIRE
            </div>
            <div className="right-text">10/07/23 14:00:00 PM</div>
          </Marquee>
        </div>
      </div>

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
        <div className="px-1">
          <img src="images/banner1.png" alt="banner" />
        </div>
        <div className="px-1">
          <img src="images/banner1.png" alt="banner" />
        </div>
        <div className="px-1">
          <img src="images/banner1.png" alt="banner" />
        </div>
        <div className="px-1">
          <img src="images/banner1.png" alt="banner" />
        </div>
      </Carousel>

      <div className="table-section mt-3">
        <div className="tab-content">
          <UpcommingMatches />
        </div>
      </div>

      <div className="griad-games">
        <div className="section-title">Fantasy Games</div>
        <div className="geiad-layout-four">
          {allGames?.length &&
            allGames?.map((game) => (
              <div
                key={game?._id}
                className={`casino-banner-item ${classNameRef.current}`}
                onClick={() => openPage('#')}
              >
                {/* <a href="#"> */}
                <img alt={game?.name || ''} src={game?.image} />
                <div role="button">Login</div>
                {/* </a> */}
              </div>
            ))}
        </div>
      </div>
      <div className="griad-games">
        <div className="section-title">Live Casino</div>
        <div className="geiad-layout-four">
          {allCasino?.length &&
            allCasino.map((casino) => (
              <div
                key={casino?._id}
                className={`casino-banner-item ${classNameRef.current}`}
                onClick={() => openPage('#')}
              >
                {/* <a href="#"> */}
                <img alt={casino?.name || ''} src={casino?.image} />
                <div role="button">Login</div>
                {/* </a> */}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default SportPageContent;
