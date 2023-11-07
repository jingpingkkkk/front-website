import React, { useState } from 'react';
import './bottomnav.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetUserDetails,
  setShouldLogin,
} from '../../../redux/reducers/user-details';
import { userLogout } from '../../../helper/user';
import StateButtons from '../stake-button-popup';
import { LIVE_MENU_ITEMS } from '../topnav/helpers/constants';

const Bottomnav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  const [isOpen, setIsOpen] = useState(false);
  const [showStakButton, setShowStakeButton] = useState(false);

  const onchangeMenu = (e, path) => {
    if (LIVE_MENU_ITEMS.includes(path)) {
      navigate(path);
    } else {
      e?.preventDefault();
    }
  };

  const toggleDropdown = (e) => {
    e?.preventDefault();
    const notLoggedIn =
      !userDetails?.user?._id || !localStorage.getItem('userToken');
    if (notLoggedIn) {
      dispatch(setShouldLogin(true));
      return;
    }
    setIsOpen(!isOpen);
  };
  const logout = () => {
    dispatch(resetUserDetails());
    userLogout();
  };

  return (
    <div>
      {!isOpen && (
        <div className="bottom-tabs">
          <span className="bottom-image" />
          <ul>
            <li className="truncate all-sports">
              <NavLink
                to="/sports"
                onClick={(e) => {
                  onchangeMenu(e, '/sports');
                }}
              >
                <img src="./images/basketball-ball-variant.svg" alt="home" />
                <div className="title-name">Sports</div>
              </NavLink>
            </li>
            <li className="truncate all-sports">
              <NavLink
                to="/casino"
                onClick={(e) => {
                  onchangeMenu(e, '/casino');
                }}
              >
                <img src="./images/poker-1.svg" alt="offers" />
                <div className="title-name">Casino</div>
              </NavLink>
            </li>
            <li className="big bowler">
              <NavLink
                to="/sports"
                onClick={(e) => {
                  onchangeMenu(e, '/sports');
                }}
              >
                <img src="./images/home-active.svg" alt="home" />
                {/* <div className="title-name">Home</div> */}
              </NavLink>
            </li>
            <li className="truncate all-sports">
              <NavLink
                to="/promotion"
                onClick={(e) => {
                  onchangeMenu(e, '/promotion');
                }}
              >
                <img src="./images/promotion.svg" alt="offers" />
                <div className="title-name">Promotion</div>
              </NavLink>
            </li>
            <li className="truncate all-sports">
              <Link
                to="/"
                onClick={(e) => {
                  toggleDropdown(e);
                }}
                data-target="dropdown2"
                className="dropdown-trigger1"
              >
                <img src="./images/refer.svg" alt="offers" />
                <div className="title-name">
                  {userDetails?.user?.fullName || 'Login'}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      )}
      <div className="bottom-profile">
        <ul
          className={`dropdown-content animated animatedFadeInUp fadeInUp mobile-profile-dropdown ${
            isOpen ? 'open' : ''
          }`}
        >
          <li>
            <Link to="/accountstatement">
              <img src="./images/icon-arrow.png" alt="arrow" />
              Account Statement
            </Link>
          </li>
          <li>
            <Link to="/currentbets">
              <img src="./images/icon-arrow.png" alt="arrow" />
              Bet History
            </Link>
          </li>
          <li>
            <Link
              to="/casinoresults"
              onClick={(e) => {
                onchangeMenu(e, '/casinoresults');
              }}
            >
              <img src="./images/icon-arrow.png" alt="arrow" />
              Casino Results
            </Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                setShowStakeButton(true);
              }}
            >
              <img src="./images/icon-arrow.png" alt="arrow" />
              Set Button Value
            </Link>
          </li>
          <li>
            <Link to="/changepassword">
              <img src="./images/icon-arrow.png" alt="arrow" />
              Change Password
            </Link>
          </li>
          <li>
            <Link to="/offers" onClick={() => logout()}>
              <img src="./images/icon-arrow.png" alt="arrow" />
              Logout
            </Link>
          </li>
          <li className="d-flex justify-content-center">
            <Link
              to="/offers"
              onClick={(e) => {
                toggleDropdown(e);
              }}
              className="close-btn"
            >
              <img src="./images/close.svg" alt="arrow" />
            </Link>
          </li>
        </ul>
      </div>
      {showStakButton && (
        <StateButtons
          isOpen={showStakButton}
          closeModal={() => setShowStakeButton(!showStakButton)}
        />
      )}
    </div>
  );
};

export default Bottomnav;
