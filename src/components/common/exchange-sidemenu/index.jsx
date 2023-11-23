/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Spinner,
} from 'reactstrap';
import { getRequest, postRequest } from '../../../api';
import {
  setFavouriteEvents,
  setFavouriteEventsCount,
  setFilteredSports,
  setLiveEventsCount,
  setSportsList,
  setSportsLoader,
  setUpComingEventsCount,
} from '../../../redux/reducers/sports-list';
import FavouriteEvents from '../../core/topnav/ui/FavouriteEvents';
import './exchangeMenu.css';
import menuImages from './menu-images';
import {
  setShouldLogin,
  setUserDetails,
} from '../../../redux/reducers/user-details';

function ExchangeSideMenu({ className = 'd-none d-lg-block' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    allSports,
    sports,
    favouriteEvents,
    loading,
    liveEventsCount,
    upComingEventsCount,
    favouriteEventsCount,
  } = useSelector((state) => state.sportsList);
  const userDetails = useSelector((state) => state.userDetails);
  const [open, setOpen] = useState('');
  const [subOpen, setSubOpen] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const toggle = (id) => {
    setOpen(id === open ? '' : id);
    setSubOpen('');
  };

  const subToggle = (id) => {
    setSubOpen(id === subOpen ? '' : id);
  };

  const handleEventClick = (id, path) => {
    // const notLoggedIn =
    //   !userDetails?.user?._id || !localStorage.getItem('userToken');
    // if (notLoggedIn) {
    //   dispatch(setShouldLogin(true));
    //   return;
    // }
    navigate(path, { state: { eventId: id } });
  };

  const searchData = (data, find) => {
    return data.reduce((acc, topic) => {
      if (topic.name.toLowerCase().includes(find.toLowerCase())) {
        return [...acc, { ...topic }];
      }
      const competitions = topic.competition.reduce((comAcc, competition) => {
        if (competition.name.toLowerCase().includes(find.toLowerCase())) {
          return [...comAcc, { ...competition, event: [] }];
        }
        const event = competition.event.filter((evnt) =>
          evnt.name.toLowerCase().includes(find.toLowerCase()),
        );
        if (event.length > 0) {
          return [...comAcc, { ...competition, event }];
        }
        return comAcc;
      }, []);
      if (competitions.length > 0) {
        return [...acc, { ...topic, competition: competitions }];
      }
      return acc;
    }, []);
  };

  const handleSearch = async (val) => {
    setSearchValue(val);
    if (val) {
      dispatch(setFilteredSports(searchData(allSports, val)));
    } else {
      dispatch(setFilteredSports(allSports));
    }
  };

  const rehydrateUser = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) return null;
    const result = await postRequest('users/rehydrateUser');
    if (result.success) {
      dispatch(setUserDetails(result.data.details));
      return result.data.details;
    }
    return null;
  };

  const getUpcomingEvents = async () => {
    try {
      let user = userDetails?.user;
      if (!userDetails?.user?._id) {
        user = await rehydrateUser();
      }
      const result = await postRequest(
        'exchangeHome/sportWiseMatchList',
        { userId: user?._id },
        false,
      );
      if (result?.success) {
        // setEvents(result?.data?.details || []);
        dispatch(setUpComingEventsCount(result?.data?.totalUpcomingEvent));
        dispatch(setLiveEventsCount(result?.data?.totalLiveEvent));
        dispatch(setFavouriteEventsCount(result?.data?.totalFavouriteEvent));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllSports = async () => {
      try {
        dispatch(setSportsLoader(true));
        const result = await getRequest('exchangeHome/sportsList', false);
        if (result?.success) {
          const sportsList = result?.data || [];
          if (sportsList?.length) {
            const favEvents = result?.data?.flatMap((sport) =>
              sport.competition.flatMap((com) =>
                com.event.filter((evnt) => evnt.isFavourite),
              ),
            );
            dispatch(setFavouriteEvents(favEvents));
          }
          dispatch(setSportsList(result?.data || []));
        }
        dispatch(setSportsLoader(false));
      } catch (error) {
        dispatch(setSportsLoader(false));
      }
    };

    getAllSports();
    getUpcomingEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeMenu = (e, path) => {
    e.preventDefault();
    // const notLoggedIn =
    //   !userDetails?.user?._id || !localStorage.getItem('userToken');
    // if (notLoggedIn) {
    //   dispatch(setShouldLogin(true));
    //   return;
    // }

    navigate(path);
  };

  const onOpenFavouriteList = (e, path) => {
    e.preventDefault();
    const notLoggedIn =
      !userDetails?.user?._id || !localStorage.getItem('userToken');
    if (notLoggedIn) {
      dispatch(setShouldLogin(true));
      return;
    }

    navigate(path);
  };

  return (
    <div className="left-fixed">
      <div id="sidebar" className={`${className} left-top`}>
        <ul className="list-unstyled components">
          <li
            className={`left-top-item ${
              liveEventsCount <= 0 ? 'disabled' : ''
            }`}
            onClick={(e) =>
              liveEventsCount > 0 ? onChangeMenu(e, '/live') : ''
            }
          >
            <span className="item-img">
              <img src="/images/icon-live.png" alt="live" />
            </span>
            <div className="left-top-item-header">Live Events</div>
            <div className="event-count">{liveEventsCount || 0}</div>
          </li>
          <li>
            <NavLink
              to="/upcoming"
              className={`left-top-item ${
                upComingEventsCount <= 0 ? 'disabled' : ''
              }`}
              onClick={(e) =>
                upComingEventsCount > 0 ? onChangeMenu(e, '/upcoming') : ''
              }
            >
              <span className="item-img">
                <img src="/images/icon-clock.png" alt="live" />
              </span>
              <div className="left-top-item-header">Upcoming</div>
              <div className="event-count">{upComingEventsCount || 0}</div>
            </NavLink>
          </li>
          <li
            to="/favourites"
            className={`left-top-item ${
              favouriteEventsCount <= 0 ? 'disabled' : ''
            }`}
            onClick={(e) =>
              favouriteEventsCount > 0
                ? onOpenFavouriteList(e, '/favourites')
                : ''
            }
          >
            <span className="item-img">
              <img src="/images/icon-star.png" alt="live" />
            </span>
            <div className="left-top-item-header">Favourite</div>
            <div className="event-count">{favouriteEventsCount || 0}</div>
          </li>
        </ul>
      </div>
      <nav id="sidebar" className={className}>
        {favouriteEvents?.length ? (
          <FavouriteEvents
            favouriteEvents={favouriteEvents}
            handleEventClick={handleEventClick}
          />
        ) : (
          ''
        )}
        <div className="search-bar">
          <div className="search-container">
            <img
              className="search-icon"
              src="images/search.png"
              alt="search-icon"
            />
            <input
              type="text"
              id="search-bar"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <ul className="list-unstyled components">
          <li className="all-sports text-deco">
            <Link to="/sports">All Sports</Link>
          </li>
          {loading ? (
            <div className="col-md-12 text-center mt-2">
              <Spinner className="text-primary" />
            </div>
          ) : (
            <Accordion open={open} toggle={toggle}>
              {sports?.map((sport) => {
                const imgPath = menuImages[sport?.name] || '';
                return (
                  <AccordionItem key={sport?._id}>
                    {sport?.competition?.length ? (
                      <>
                        <AccordionHeader targetId={sport?._id}>
                          <div>
                            <span className="image-outer">
                              <img src={imgPath} width="20" alt={sport.label} />
                            </span>
                            {sport?.name || ''}
                          </div>

                          <div>
                            <FontAwesomeIcon
                              icon={
                                open === sport._id ? faCaretUp : faCaretDown
                              }
                            />
                          </div>
                        </AccordionHeader>

                        <AccordionBody
                          accordionId={sport._id}
                          className="bg-black rounded"
                        >
                          <Accordion open={subOpen} toggle={subToggle}>
                            {sport.competition.map((comp) => (
                              <AccordionItem key={comp._id}>
                                {comp.event?.length ? (
                                  <>
                                    <AccordionHeader targetId={comp._id}>
                                      <div>{comp?.name || ''}</div>
                                      <div>
                                        <FontAwesomeIcon
                                          icon={
                                            subOpen === comp._id
                                              ? faCaretUp
                                              : faCaretDown
                                          }
                                        />
                                      </div>
                                    </AccordionHeader>

                                    <AccordionBody
                                      accordionId={comp._id}
                                      className="rounded mx-1"
                                      style={{ background: '#101215' }}
                                    >
                                      {comp?.event?.map((evnt) => (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleEventClick(
                                              evnt?._id,
                                              '/matches',
                                            )
                                          }
                                          key={evnt?._id}
                                          className="sidebar-link"
                                          // to="/matches"
                                          // state={{ eventId: evnt?._id }}
                                        >
                                          {evnt?.name || ''}
                                        </button>
                                      ))}
                                    </AccordionBody>
                                  </>
                                ) : (
                                  <Link className="sidebar-link" to={comp.link}>
                                    {comp?.name || ''}
                                  </Link>
                                )}
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </AccordionBody>
                      </>
                    ) : (
                      <div className="d-flex align-items-center sports-item">
                        <span className="image-outer">
                          <img src={imgPath} width="20" alt={sport.label} />
                        </span>
                        <Link className="sidebar-link" to={sport.link}>
                          {sport?.name || ''}
                        </Link>
                      </div>
                    )}
                  </AccordionItem>
                );
              })}
            </Accordion>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default ExchangeSideMenu;
