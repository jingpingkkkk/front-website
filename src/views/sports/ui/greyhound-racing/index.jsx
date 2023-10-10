/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import menuImages from '../../../../components/common/exchange-sidemenu/menu-images';
import '../../../matches/ui/matches.css';

function GreyhoundRacing({ events, sportName }) {
  const imgPath = menuImages[sportName] || '';
  const [countryTab, setCountryTab] = useState([]);
  const [activeTab, setActiveTab] = useState(countryTab[0]);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const allCode = events?.map((evnt) => evnt.countryCode);
    const event = events?.filter((evnt) => evnt?.countryCode === allCode[0]);
    setEventData(event);
    setCountryTab(allCode);
    setActiveTab(allCode[0]);
  }, [events]);

  const onChangeTab = (code) => {
    setEventData([]);
    setActiveTab(code);
    const event = events?.filter((evnt) => evnt?.countryCode === code);
    setEventData(event);
  };
  console.log('eventData', eventData);

  return (
    <div className="comman-bg mb-0">
      <div className="bet-table-header d-flex sport4 d-none-mobile">
        <div className="game-title justify-content-start">
          <img src={imgPath} alt={sportName} className="sports-image" />
          <span className="ms-1">{sportName || ''}</span>
        </div>
      </div>
      <div className="bet-table-body">
        <div className="horse-tab race65">
          <ul className="nav nav-pills">
            {countryTab?.length
              ? countryTab.map((country) => (
                  <li className="nav-item" key={country}>
                    <a
                      className={
                        activeTab === country ? 'nav-link active' : 'nav-link'
                      }
                      href="#"
                      role="tab"
                      onClick={() => onChangeTab(country)}
                    >
                      {country}
                    </a>
                  </li>
                ))
              : ''}
          </ul>
        </div>
        <div className="tab-content">
          <div className="bet-table tab-pane fade horse-table active show">
            <div className="bet-table-body">
              <div className="bet-table-box">
                {eventData?.length
                  ? eventData?.map((event) => (
                      <div key={event?._id}>
                        <div className="bet-table-row-header-mobile d-none-desktop">
                          <div className="game-title mb-0">
                            <div className="game-name d-inline-block">
                              <div className="tv-icons">
                                <div className="game-icon tv-icon">
                                  <img src="./images/icon-tv.png" alt="tv" />
                                </div>
                                <p className="team-name text-left">
                                  {event?.eventName || ''}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bet-table-row">
                          <div className="game-title d-none-mobile">
                            <div className="tv-icons">
                              <div className="game-icon tv-icon">
                                <img src="./images/icon-tv.png" alt="tv" />
                              </div>
                            </div>
                            <div className="game-name d-inline-block ps-0">
                              <p className="team-name text-left">
                                {event?.eventName || ''}
                              </p>
                            </div>
                          </div>
                          <div className="horse-time-detail">
                            {event?.market.map((mrkt) => (
                              <a
                                key={mrkt?._id}
                                href="/sport/detail/Ky3Lwv5A1ABHmil6Q0cleg==/+VMmgMpNtfWaQuCKLkYalA=="
                              >
                                <span>{mrkt?.time}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GreyhoundRacing;
