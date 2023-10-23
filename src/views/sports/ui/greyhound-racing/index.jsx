/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import menuImages from '../../../../components/common/exchange-sidemenu/menu-images';
import '../../../matches/ui/matches.css';
import { setShouldLogin } from '../../../../redux/reducers/user-details';

function GreyhoundRacing({ events, sportName, activeTab, onTabChange }) {
  const imgPath = menuImages[sportName] || '';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);

  const [countryTab, setCountryTab] = useState([]);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const allCode = events
      ?.map((evnt) => evnt.countryCode)
      .filter((name, index, array) => array.indexOf(name) === index);
    const activeCode = activeTab || allCode[0];
    const event = events?.filter((evnt) => evnt?.countryCode === activeCode);
    setEventData(event);
    setCountryTab(allCode);
    onTabChange(activeCode);
  }, [events]);

  const onChangeTab = (code) => {
    setEventData([]);
    onTabChange(code);
    const event = events?.filter((evnt) => evnt?.countryCode === code);
    setEventData(event);
  };

  const handleEventClick = (e, path, marketId, eventId) => {
    e.preventDefault();
    const notLoggedIn =
      !userDetails?.user?._id || !localStorage.getItem('userToken');
    if (notLoggedIn) {
      dispatch(setShouldLogin(true));
      return;
    }

    navigate(path, { state: { eventId, marketId, sportName } });
  };

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
                    <button
                      type="button"
                      className={
                        activeTab === country ? 'nav-link active' : 'nav-link'
                      }
                      role="tab"
                      onClick={() => onChangeTab(country)}
                    >
                      {country}
                    </button>
                  </li>
                ))
              : ''}
          </ul>
        </div>
        <div className="tab-content">
          <div className="bet-table tab-pane fade horse-table active show">
            <div className="bet-table-body">
              <div className="bet-table-box">
                {eventData?.length ? (
                  eventData?.map((event) => (
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
                            <Link
                              key={mrkt?._id}
                              to="/matches"
                              state={{ eventId: mrkt?._id }}
                              onClick={(e) =>
                                handleEventClick(
                                  e,
                                  '/matches',
                                  mrkt?._id,
                                  event?._id,
                                )
                              }
                            >
                              <span>{mrkt?.time}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center">NO DATA</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GreyhoundRacing;
