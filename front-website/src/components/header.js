import React from 'react';

const Header = () => {  
    
  return (
    <header>
    <div className="container-fluid">
        <div className="header-main">
            <div className="headder-col-left">
                <div className="logo"><a href="#"><img src="images/logo.png"/></a></div>
            </div>
            <div className="header-col-right">
                <div className="header-right-one">
                    <ul className="nav-main">
                        <li className="menu-item button">
                            <a href="#" className="nav-items custom-buttton">Exchange</a>
                        </li>
                        <li className="menu-item">
                            <a href="#" className="nav-items">Live Casino</a>
                        </li>
                        <li className="menu-item">
                            <a href="#" className="nav-items">Slot</a>
                        </li>
                        <li className="menu-item">
                            <a href="#" className="nav-items">Fantasy Games</a>
                        </li>
                        <li className="menu-item">
                            <a href="#" className="nav-items"><img src="images/aviator-menu-image.png"/></a>
                        </li>
                    </ul>
                </div>
                <div className="header-right-two">
                    <ul className="button-group">
                        <li className="nav-buttons">
                            <a href="#" className="custom-buttton">SIGN IN</a>
                        </li>
                        <li className="nav-buttons">
                            <a href="#" className="custom-buttton">REGISTER</a>
                        </li>
                        <li className="nav-buttons">
                            <a href="#" className="setting"><img src="images/srttings.png"/></a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* <div className="mobile-toggler" style="display: none;">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
            </div> */}
        </div>
    </div>
</header>
  );
};

export default Header;