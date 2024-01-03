import 'jspdf-autotable';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { postRequest } from '../../../../api';
import { setShouldLogin } from '../../../../redux/reducers/user-details';
import './casino-detail.css';

function CasinoDetailPageContent() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  console.log('userDetails', userDetails);

  const [urls, setUrls] = useState({
    mobileUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY',
    desktopUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY',
  });

  const fetchAuraLaunchUrl = async () => {
    const notLoggedIn =
      !userDetails?.user?._id || !localStorage.getItem('userToken');

    if (notLoggedIn) {
      dispatch(setShouldLogin(true));
      return;
    }

    const response = await postRequest('poker/getLaunchUrl', {}, true, '/api');
    if (response.success) {
      setUrls(response.data);
    }
  };

  useEffect(() => {
    fetchAuraLaunchUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="casino-container">
      <div className="casino-table">
        <div className="casino-video">
          {/* <div className="disconnected-box">
            <div className="disconnected-message">
              <div className="text-center disconnected-title">
                <img
                  src="/images/icon-alert.png"
                  alt="icon-alert"
                  className="alert-img"
                />
                <b>Disconnection due to inactivity</b>
              </div>
              <div className="mt-2">
                Are you there? You have been disconnected. Please go back to
                home or start playing again
              </div>
              <div className="disconnected-buttons mt-3">
                <button type="button" className="btn btn-outline-primary">
                  Reconnect
                </button>
                <a
                  href="/casino"
                  className="btn btn-outline-danger router-link-active"
                >
                  Home
                </a>
              </div>
            </div>
          </div> */}
          <div className="casino-video-title">
            <span className="casino-name">Sic Bo</span>
            <div className="casino-video-rid">Round ID: 7270990774593</div>
          </div>
          <div className="video-box-container">
            <div className="video-box">
              <iframe src={urls.desktopUrl} title="aura" />
            </div>
          </div>
          <div className="casino-timer d-none-small">
            <div className="base-timer">
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className="base-timer__svg"
              >
                <g className="base-timer__circle">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className="base-timer__path-elapsed"
                  />
                  <path
                    strokeDasharray="165 283"
                    d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
                    className="base-timer__path-remaining green"
                  />
                </g>
              </svg>
              <span className="base-timer__label green">
                <span>1</span>
                <span>5</span>
              </span>
            </div>
          </div>
          <div className="casino-video-right-icons">
            <div title="Home" className="casino-video-home-icon">
              <a href="/casino" className="router-link-active">
                <img
                  src="/images/icon-home.png"
                  alt="home"
                  className="casino-icon"
                />
              </a>
            </div>
            <div title="Rules" className="casino-video-rules-icon">
              <img src="/images/blog.png" alt="home" className="casino-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CasinoDetailPageContent;
