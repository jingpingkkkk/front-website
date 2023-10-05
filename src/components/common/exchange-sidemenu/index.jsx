/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Spinner,
} from 'reactstrap';
import { getRequest } from '../../../api';
import {
  setFavouriteEvents,
  setFilteredSports,
  setSportsList,
  setSportsLoader,
} from '../../../redux/reducers/sports-list';
import { setShouldLogin } from '../../../redux/reducers/user-details';
import FavouriteEvents from '../../core/topnav/ui/FavouriteEvents';
import './exchangeMenu.css';
import menuImages from './menu-images';

function ExchangeSideMenu({ className = 'd-none d-lg-block' }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { allSports, sports, favouriteEvents, loading } = useSelector(
    (state) => state.sportsList,
  );

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
    const notLoggedIn =
      !userDetails?.user?._id || !localStorage.getItem('userToken');
    if (notLoggedIn) {
      dispatch(setShouldLogin(true));
      return;
    }
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

  useEffect(() => {
    const getAllSports = async () => {
      try {
        dispatch(setSportsLoader(true));
        const result = await getRequest('exchangeHome/sportsList', false);
        if (result?.success) {
          const sportsList = result?.data || [];
          if (sportsList?.length) {
            const favEvents = allSports?.flatMap((sport) =>
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
                            icon={open === sport._id ? faCaretUp : faCaretDown}
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
  );
}

export default ExchangeSideMenu;
