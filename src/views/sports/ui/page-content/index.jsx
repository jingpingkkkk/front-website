/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Carousel } from 'react-responsive-carousel';
import { getRequest } from '../../../../api';
import UpcommingMatches from '../upcomming-matches';

function SportPageContent() {
  const [events, setEvents] = useState([]);

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

  useEffect(() => {
    getUpcomingEvents();
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
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/aviator.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/dream-wheel.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/poptheball.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/Dice-Pascal-Gaming.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/Magic-Dice-Pascal-Gaming.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/Catch-Me.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/x50-wheel.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/big-hilo.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
        </div>
      </div>
      <div className="griad-games">
        <div className="section-title">Live Casino</div>
        <div className="geiad-layout-four">
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/tembo.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/creedrooms.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/vivo.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/evolution.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/lucky.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/ezugi.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/bota.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/super-spled.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/ckckfight.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
          <div className="casino-banner-item login-hover">
            <a href="#">
              <img alt="casino" src="images/slots.jpg" />
              <div role="button">Login</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SportPageContent;
