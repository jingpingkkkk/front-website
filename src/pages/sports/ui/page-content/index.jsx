/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-script-url */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Carousel } from 'react-responsive-carousel';

function SportPageContent() {
  return (
    <>
      {/* Banner Slider */}
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
          <img src="images/banner1.png" alt="banner" />
        </div>
        <div>
          <img src="images/banner1.png" alt="banner" />
        </div>
        <div>
          <img src="images/banner1.png" alt="banner" />
        </div>
        <div>
          <img src="images/banner1.png" alt="banner" />
        </div>
        <div>
          <img src="images/banner1.png" alt="banner" />
        </div>
      </Carousel>

      <div className="table-section">
        <div className="sport-tabs">
          <a href="javascript:void(0)" className="arrow-tabs arrow-left">
            <img src="images/arrow-down.svg" />
          </a>
          <ul id="taj_home_sports_list" className="nav nav-tabs">
            <li className="nav-item item">
              <a href="#inpay" className="nav-link active" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/in-play.png" />
                  <div className="title-area">InPlay</div>
                  <div className="remark">
                    <span className="totel">7B</span>
                    <span className="out-of">24</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#CricketTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/Cricketball.png" />
                  <div className="title-area">Cricket</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#TennisTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/Tennis.png" />
                  <div className="title-area">Tennis</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#SoccerTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/Football.png" />
                  <div className="title-area">Soccer</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>

            <li className="nav-item item">
              <a href="#BasketballTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/Basketball.png" />
                  <div className="title-area">Basketball</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#RugbyTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/Rugbyball.png" />
                  <div className="title-area">Rugby</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#BaseballTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/Baseball-01.png" />
                  <div className="title-area">Baseball</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#HorseRacingTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/hource-racing.png" />
                  <div className="title-area">Horse Racing</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#GreyhoundRacingTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/greyhound-racing.png" />
                  <div className="title-area">Greyhound Racing</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#VolleyballTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/Valleyball-01 1.png" />
                  <div className="title-area">Volleyball</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#BoxingTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/Boxing.png" />
                  <div className="title-area">Boxing</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#IceHockyTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/ice-hocky.png" />
                  <div className="title-area">Ice Hocky</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#SnookerTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/Snooker.png" />
                  <div className="title-area">Snooker</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#RacingTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/Bike.png" />
                  <div className="title-area">Racing</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#ChessTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/chess.png" />
                  <div className="title-area">Chess</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
            <li className="nav-item item">
              <a href="#EGamingTab" className="nav-link" role="tab" data-toggle="tab" aria-selected="false">
                <div className="tab-main">
                  <img src="images/e-game.png" />
                  <div className="title-area">E Gaming</div>
                  <div className="remark">
                    <span className="totel">18</span>
                    <span className="out-of">23</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
          <a href="javascript:void(0)" className="arrow-tabs arrow-right">
            <img src="images/arrow-down.svg" />
          </a>
        </div>

        <div className="tab-content">
          <div role="tabpanel" className="tab-pane fade in active" id="inpay">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="CricketTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="TennisTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="BasketballTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="RugbyTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="BaseballTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="HorseRacingTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="GreyhoundRacingTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="VolleyballTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="BoxingTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="IceHockyTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="SnookerTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="RacingTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="ChessTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div role="tabpanel" className="tab-pane" id="EGamingTab">
            <div className="bet-table">
              <div className="custom-table">
                <div className="cus-row row1 title-row">
                  <div className="cus-col1 cus-w-10" />
                  <div className="cus-col1 cus-w-60" />
                  <div className="cus-col1 cus-w-10">1</div>
                  <div className="cus-col1 cus-w-10">X</div>
                  <div className="cus-col1 cus-w-10">2</div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
                <div className="cus-row table-block-row">
                  <div className="cus-col1 cus-w-10">
                    <div className="match-date">
                      <span className="day">Today</span>
                      <span className="-timedate">3:00 PM</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-60">
                    <div className="match-disc">
                      <div className="teamname">
                        Hampshire <img src="images/vs.png" />
                      </div>
                      <div className="team-captain">Somerset</div>
                      <div className="team-owner">Championship League</div>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                  <div className="cus-col1 cus-w-10">
                    <div className="details">
                      <span className="left">1.01</span>
                      <span className="right">1.02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
