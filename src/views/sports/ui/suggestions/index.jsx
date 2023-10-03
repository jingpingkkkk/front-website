/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { setLoginPopup } from '../../../../redux/reducers/login-popup';

function ProductPromotion() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const [activeTab, setActiveTab] = useState('live');
  const casino = useSelector((state) => state.casino);
  const classNameRef = useRef('');
  const checkLogin = () => {
    if (Object.keys(userDetails?.user)?.length <= 0) {
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
    checkLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {/* <div className="pramotion-sec">
        <div className="pramotion-title">promotion</div>

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
          <div>
            <img src="images/side-banner.png" alt="carouselbanner" />
          </div>
          <div>
            <img src="images/side-banner.png" alt="carouselbanner" />
          </div>
          <div>
            <img src="images/side-banner.png" alt="carouselbanner" />
          </div>
          <div>
            <img src="images/side-banner.png" alt="carouselbanner" />
          </div>
          <div>
            <img src="images/side-banner.png" alt="carouselbanner" />
          </div>
        </Carousel>
      </div> */}

      <div className="tabing-sec">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a
              className={activeTab === 'live' ? 'nav-link active' : 'nav-link'}
              href="#"
              role="tab"
              onClick={() => setActiveTab('live')}
            >
              Live
            </a>
          </li>
          <li className="nav-item">
            <a
              className={
                activeTab === 'virtual' ? 'nav-link active' : 'nav-link'
              }
              href="#"
              role="tab"
              onClick={() => setActiveTab('virtual')}
            >
              Virtual
            </a>
          </li>
        </ul>

        {/* Tab Panes */}
        <div className="tab-content">
          {activeTab === 'live' ? (
            <div role="tabpanel" className="tab-pane fade in active" id="live">
              <div className="griad-tabing">
                <div className="geiad-layout-two">
                  {casino?.liveCasino?.length
                    ? casino?.liveCasino?.map((liveCasino) => (
                        <div
                          className={`casino-banner-item ${classNameRef.current}`}
                          key={liveCasino?._id}
                          onClick={() => openPage('#')}
                        >
                          {/* <a href="#"> */}
                          <img alt="casino" src={liveCasino?.image} />
                          <div role="button">Login</div>
                          {/* </a> */}
                        </div>
                      ))
                    : ''}
                </div>
              </div>
            </div>
          ) : (
            <div
              role="tabpanel"
              className="tab-pane fade in active"
              id="virtual"
            >
              <div className="geiad-layout-two">
                {casino?.virtualCasino?.length
                  ? casino?.virtualCasino?.map((virtualCasino) => (
                      <div
                        className={`casino-banner-item ${classNameRef.current}`}
                        key={virtualCasino?._id}
                        onClick={() => openPage('#')}
                      >
                        {/* <a href="#"> */}
                        <img alt="casino" src={virtualCasino?.image} />
                        <div role="button">Login</div>
                        {/* </a> */}
                      </div>
                    ))
                  : ''}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPromotion;
