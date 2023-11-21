/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import moment from 'moment';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import menuImages from '../../../../components/common/exchange-sidemenu/menu-images';
import '../../../matches/ui/matches.css';
import { setShouldLogin } from '../../../../redux/reducers/user-details';
import { postRequest } from '../../../../api';
import { setFavouriteEventsCount } from '../../../../redux/reducers/sports-list';
import { setEventFavourite } from '../../../../redux/reducers/event-market';

function EventList({ events, sportName, sportsId }) {
  const [loading, setLoading] = useState(false);
  const imgPath = menuImages[sportName] || '';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userDetails);
  const { favouriteEventsCount } = useSelector((state) => state.sportsList);
  const handleEventClick = (e, path, id) => {
    // e.preventDefault();
    // const notLoggedIn =
    //   !userDetails?.user?._id || !localStorage.getItem('userToken');
    // if (notLoggedIn) {
    //   dispatch(setShouldLogin(true));
    //   return;
    // }

    navigate(path, { state: { eventId: id } });
  };

  const handleOddsClick = (e, path, id) => {
    e.preventDefault();
    const notLoggedIn =
      !userDetails?.user?._id || !localStorage.getItem('userToken');
    if (notLoggedIn) {
      dispatch(setShouldLogin(true));
      return;
    }

    navigate(path, { state: { eventId: id } });
  };

  const onAddFavEvent = async (eventId, isFav) => {
    const notLoggedIn =
      !userDetails?.user?._id || !localStorage.getItem('userToken');
    if (notLoggedIn) {
      dispatch(setShouldLogin(true));
      return;
    }
    setLoading(true);
    const body = {
      userId: userDetails?.user?._id,
      eventId,
    };
    const res = await postRequest('favourite/addRemoveFavourite', body);
    if (res?.success) {
      dispatch(
        setFavouriteEventsCount(
          isFav ? favouriteEventsCount + 1 : favouriteEventsCount - 1,
        ),
      );
      dispatch(setEventFavourite({ sportsId, eventId }));
    }
    setLoading(false);
  };

  return (
    <div className="comman-bg mb-0">
      <div className="bet-table-header d-flex sport4 d-none-mobile">
        <div className="game-title justify-content-start">
          <img src={imgPath} alt={sportName} className="sports-image" />
          <span className="ms-1">{sportName || ''}</span>
        </div>
        <div className="point-title">1</div>
        <div className="point-title">X</div>
        <div className="point-title">2</div>
      </div>
      <div className="bet-table-body">
        {events?.length ? (
          events?.map((event, i) => {
            const teams = event?.eventName.split('v');
            return (
              <div className="bet-table-box" key={i}>
                <div className="bet-table-row p-2">
                  <div className="game-title d-none-mobil">
                    <div className="date-height">
                      <div
                        className={`date-time ${
                          event?.isLive ? 'in-play' : ''
                        }`}
                      >
                        <div className={` ${event?.isLive ? 'animate' : ''}`}>
                          <ul
                            className={` ${
                              event?.isLive ? 'flip-animation' : ''
                            }`}
                          >
                            <li className="time_date">
                              <span className="time">
                                {event?.matchDate
                                  ? moment(event?.matchDate).isSame(
                                      moment(),
                                      'day',
                                    )
                                    ? 'Today'
                                    : moment(event?.matchDate).isSame(
                                        moment().clone().add(1, 'day'),
                                        'day',
                                      )
                                    ? 'Tomorrow'
                                    : moment(event?.matchDate).format('Do MMM')
                                  : ''}
                              </span>
                              <span className="date">
                                {event?.matchDate
                                  ? moment(event?.matchDate).format('HH:mm')
                                  : ''}
                              </span>
                            </li>
                            {event?.isLive ? (
                              <li>
                                <span className="in-play-light">
                                  {/* <div className="icon-holder-small">
                                  <div className="sports-icon inplay-light-icon" />
                                </div> */}
                                  In-Play
                                </span>
                              </li>
                            ) : (
                              ''
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="game-name d-inline-block">
                      <Link
                        className="text-decoration-none"
                        to="/matches"
                        state={{ eventId: event?._id }}
                        onClick={(e) =>
                          handleEventClick(e, '/matches', event?._id)
                        }
                      >
                        <div className="d-flex align-items-center">
                          <p className="team-name text-left">
                            {teams[0] || ''}
                          </p>
                        </div>
                        <p className="team-name text-left">{teams[1] || ''}</p>
                        <p className="team-name text-left team-event">
                          ({event?.competitionName || ''})
                        </p>
                      </Link>
                    </div>
                    <div className="game-icons">
                      {userDetails?.user?.balance >= 500 &&
                      event?.videoStreamId ? (
                        <div className="game-icon">
                          <span className="f-bm-icon">
                            <img src="/images/icon-tv.png" alt="tv" />
                          </span>
                        </div>
                      ) : (
                        ''
                      )}
                      <div className="game-icon">
                        <span className="f-bm-icon">F1</span>
                      </div>
                      <div className="game-icon">
                        <span className="f-bm-icon">F</span>
                      </div>
                    </div>
                  </div>
                  <div className="point-title">
                    <button
                      type="button"
                      className="back bl-box event-box"
                      onClick={(e) =>
                        handleOddsClick(e, '/matches', event?._id)
                      }
                    >
                      <span className="d-block odds">
                        {event?.matchOdds?.[0]?.back[0]?.price || ''}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="lay bl-box event-box"
                      onClick={(e) =>
                        handleOddsClick(e, '/matches', event?._id)
                      }
                    >
                      <span className="d-block odds">
                        {event?.matchOdds?.[0]?.lay[0]?.price || ''}
                      </span>
                    </button>
                  </div>
                  <div className="point-title">
                    <div className="no-val bl-box event-box">
                      <span className="d-block odds">—</span>
                    </div>
                    <div className="no-val bl-box event-box">
                      <span className="d-block odds">—</span>
                    </div>
                  </div>
                  <div className="point-title last">
                    <button
                      type="button"
                      className="back bl-box event-box"
                      onClick={(e) =>
                        handleOddsClick(e, '/matches', event?._id)
                      }
                    >
                      <span className="d-block odds">
                        {event?.matchOdds?.[1]?.back[0]?.price || ''}
                      </span>
                    </button>
                    <button
                      type="button"
                      className="lay bl-box event-box"
                      onClick={(e) =>
                        handleOddsClick(e, '/matches', event?._id)
                      }
                    >
                      <span className="d-block odds">
                        {event?.matchOdds?.[1]?.lay[0]?.price || ''}
                      </span>
                    </button>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <button
                      type="button"
                      className="bg-transparent pe-0"
                      disabled={loading}
                      onClick={() => {
                        onAddFavEvent(event?._id, !event?.favourite);
                      }}
                    >
                      <img
                        src={`/images/${
                          event?.favourite
                            ? 'icon-favorite-blue.png'
                            : 'icon-favorite.png'
                        }`}
                        alt="fav"
                        style={{ height: '20px', width: '20px' }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-3 text-center">NO DATA</div>
        )}
      </div>
    </div>
  );
}

export default EventList;
