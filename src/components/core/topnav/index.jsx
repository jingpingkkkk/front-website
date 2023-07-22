/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';

function Topnav() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const headerClassName = isSticky ? 'stiky-header' : '';

  const handleMobileMenuToggle = () => {
    document.body.classList.toggle('menu-open');
  };

  return (
    <header className={headerClassName}>
      <div className="container-fluid">
        <div className="header-main">
          <div className="headder-col-left">
            <div className="logo">
              <a href="#">
                <img src="images/logo.png" alt="app-logo" />
              </a>
            </div>
          </div>

          <div className="header-col-right">
            <div className="header-right-one">
              <ul className="nav-main">
                <li className="menu-item button">
                  <a href="#" className="nav-items custom-buttton">
                    Exchange
                  </a>
                </li>

                <li className="menu-item">
                  <a href="#" className="nav-items">
                    Live Casino
                  </a>
                </li>

                <li className="menu-item">
                  <a href="#" className="nav-items">
                    Slot
                  </a>
                </li>

                <li className="menu-item">
                  <a href="#" className="nav-items">
                    Fantasy Games
                  </a>
                </li>

                <li className="menu-item">
                  <a href="#" className="nav-items">
                    <img src="images/aviator-menu-image.png" alt="aviator" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="header-right-two">
              <ul className="button-group">
                <li className="nav-buttons">
                  <a href="#" className="custom-buttton">
                    SIGN IN
                  </a>
                </li>
                <li className="nav-buttons">
                  <a href="#" className="custom-buttton">
                    REGISTER
                  </a>
                </li>
                <li className="nav-buttons">
                  <a href="#" className="setting">
                    <img src="images/srttings.png" alt="change-theme" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mobile-toggler" style={{ display: 'none' }}>
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
              aria-controls="navbar"
              onClick={() => handleMobileMenuToggle()}
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topnav;
