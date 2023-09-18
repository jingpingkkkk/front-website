/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function ProductPromotion() {
  const [activeTab, setActiveTab] = useState('live');

  return (
    <>
      <div className="pramotion-sec">
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
      </div>

      <div className="tabing-sec mt-3">
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
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/vteen20.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/ab3.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/vlucky7.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/trap.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/poker.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/teen6.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/poker20.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/teen9.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/race20.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/trio.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/baccarat.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/notenum.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/roulette.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/teen3.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/lottcard.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
                  <div className="casino-banner-item login-hover">
                    <a href="#">
                      <img alt="casino" src="images/btable.jpg" />
                      <div role="button">Login</div>
                    </a>
                  </div>
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
                    <img
                      alt="casino"
                      src="images/Magic-Dice-Pascal-Gaming.jpg"
                    />
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
                    <img
                      alt="casino"
                      src="images/Magic-Dice-Pascal-Gaming.jpg"
                    />
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
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPromotion;
