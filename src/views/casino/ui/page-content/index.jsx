/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable new-cap */
/* eslint-disable react/no-unstable-nested-components */
import 'jspdf-autotable';
import React, { useState, useEffect } from 'react';
import './casino.css';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
} from 'reactstrap';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';
import useScreenWidth from '../../../../hooks/use-screen-width';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { postRequest } from '../../../../api';

function CasinoPageContent() {
  const location = useLocation();
  const { casinoId = null } = location.state || {};
  const { width } = useScreenWidth();
  const { allCasino, casinoListLoading } = useSelector((state) => state.casino);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [activeItem, setActiveItem] = useState(casinoId);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);

  const perPage = 8;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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
    slidesToShow = 9;
  } else if (width >= 1920 && width < 2560) {
    slidesToShow = 12;
  } else if (width <= 2560) {
    slidesToShow = 16;
  }

  const fetchData = async (isSkipLoading = false) => {
    try {
      setLoading(!isSkipLoading);
      const body = {
        page,
        perPage,
        casinoId: activeItem,
        gameType: activeTab,
      };
      const result = await postRequest('casinoGame/getCasinoGame', body, false);
      if (result?.success) {
        const records = result.data.records || [];
        setTotalRecords(result?.data?.totalRecords);
        setItems(items.concat(records));
        setPage(page + 1);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const handleItemClick = (gameId) => {
    if (activeItem !== gameId) {
      setItems([]);
      setPage(1);
      setActiveItem(gameId);
    }
  };

  const handleTabClick = (tab) => {
    if (activeTab !== tab) {
      setPage(1);
      setItems([]);
      setActiveTab(tab);
    }
  };
  useEffect(() => {
    setItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [casinoId]);

  useEffect(() => {
    setActiveItem(casinoId);
    setPage(1);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeItem, activeTab, casinoId]);

  const getActiveItemName = () => {
    if (activeItem === null) {
      return 'All Games';
    }

    const activeGame = allCasino.find((game) => game._id === activeItem);
    return activeGame ? activeGame.name : '';
  };

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
              slidesToScroll={1}
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
            <button
              type="button"
              className={` ${activeTab === '' ? 'active' : ''}`}
              onClick={() => {
                handleTabClick('');
              }}
            >
              <span className="txt">All</span>
            </button>
            <button
              type="button"
              className={` ${activeTab === 'favourite' ? 'active' : ''}`}
              onClick={() => {
                handleTabClick('favourite');
              }}
            >
              <span className="txt">Favourite</span>
            </button>
            <button
              type="button"
              className={` ${activeTab === 'live' ? 'active' : ''}`}
              onClick={() => {
                handleTabClick('live');
              }}
            >
              <span className="txt">Live</span>
            </button>
            <button
              type="button"
              className={` ${activeTab === 'virtual' ? 'active' : ''}`}
              onClick={() => {
                handleTabClick('virtual');
              }}
            >
              <span className="txt">Virtual</span>
            </button>
          </div>

          <ul className="right d-flex game-providers col-xl-3 col-sm-12 col-12">
            {/* <li className="all_providers">
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
            </li> */}
            <li className="all_providers me-0">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                <DropdownToggle caret className="game-dropdown">
                  {getActiveItemName()}
                </DropdownToggle>
                <DropdownMenu className="p-0">
                  <DropdownItem
                    className={`collection-item cursor-pointer ${
                      activeItem === null ? 'active' : ''
                    }`}
                    onClick={() => handleItemClick(null)}
                  >
                    <img
                      alt="All Games"
                      loading="lazy"
                      className="responsive-img"
                      src="/images/all_games.webp"
                    />
                    <span className="title providers"> All Games </span>
                  </DropdownItem>
                  {casinoListLoading ? (
                    <DropdownItem>
                      <span className="title providers"> ... </span>
                    </DropdownItem>
                  ) : allCasino?.length ? (
                    allCasino?.map((game) => (
                      <DropdownItem
                        className={`collection-item cursor-pointer ${
                          activeItem === game._id ? 'active' : ''
                        }`}
                        key={game._id}
                        onClick={() => handleItemClick(game._id)}
                      >
                        <img
                          alt={game.name}
                          loading="lazy"
                          className="responsive-img"
                          src={game.image}
                        />
                        <span className="title providers">
                          {game.name || ''}
                        </span>
                      </DropdownItem>
                    ))
                  ) : (
                    <DropdownItem>
                      <span className="title providers"> No Data </span>
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
        <div className="row portfolio" id="scrollableDiv">
          {loading ? (
            <div className="port-content text-center w-100">
              <Spinner className="text-primary" />
            </div>
          ) : !items?.length ? (
            <div className="port-content text-center w-100">No Data</div>
          ) : (
            <InfiniteScroll
              dataLength={items.length}
              next={() => fetchData(true)}
              hasMore={items?.length !== totalRecords}
              scrollableTarget="scrollableDiv"
            >
              {items.map((item) => (
                <div className="port-content" key={item?._id}>
                  <div className="port-inner">
                    <a href="/casinodetail">
                      <div className="port-inner">
                        <div className="thumb">
                          <img
                            className="img-fluid"
                            src={item?.image}
                            alt={item?.name}
                          />
                        </div>
                        <div className="port-btn content">
                          <h4>
                            <div className="sub-name">{item?.name || ''}</div>
                            <div className="sub-title">Supernowa</div>
                          </h4>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          )}
          {!loading && items?.length < totalRecords ? (
            <div className="loading text-muted">Loading...</div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default CasinoPageContent;
