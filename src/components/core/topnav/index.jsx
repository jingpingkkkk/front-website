import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { postRequest } from '../../../api';
import {
  setStakeButtons,
  setUserDetails,
} from '../../../redux/reducers/user-details';
import LoginPopup from '../login-popup';
import RegisterPopup from '../register-popup';
import WelcomePopup from '../welcome-popup';
import topNavItems from './api/top-nav-items';
import './topNav.css';
import MenuToggleButton from './ui/MenuToggleButton';
import StickyHeader from './ui/StickyHeader';
import UserInfo from './ui/UserInfo';

function Topnav() {
  const dispatch = useDispatch();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [user, setUser] = useState('');
  const [isWelcome, setIsWelcome] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };
  const toggleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen);
  };

  useEffect(() => {
    const getUserStakeButtons = async () => {
      const result = await postRequest('stake/getUserStakes');
      if (result?.success) {
        const gameButtons = result.data.details.find(
          (el) => el.stakeType === 'games',
        );
        const casinoButtons = result.data.details.find(
          (el) => el.stakeType === 'casino',
        );
        dispatch(setStakeButtons({ casinoButtons, gameButtons }));
      }
    };

    const rehydrateUser = async () => {
      const result = await postRequest('users/rehydrateUser');
      if (result.success) {
        dispatch(setUserDetails(result.data.user));
        await getUserStakeButtons();
      }
    };
    rehydrateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem('user'));
    if (localStorage.getItem('isWelcome') === 'true') {
      setIsWelcome(true);
    }
    if (item) {
      setUser(item);
    }
  }, [isWelcome]);

  return (
    <StickyHeader>
      {/* Mobile View */}
      <div className="d-lg-none">
        <MenuToggleButton />

        <NavLink to="/" className="ms-5 ps-3">
          <img src="images/logo.png" width="125" alt="brand-logo" />
        </NavLink>
      </div>

      {/* Logo - Desktop View */}
      <NavLink to="/" className="d-none d-lg-block">
        <img src="images/logo.png" width="150" alt="brand-logo" />
      </NavLink>

      {/* Nav Items */}
      <div className="d-none d-lg-flex align-items-center">
        {topNavItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `me-4 nav-items ${isActive ? 'custom-buttton' : ''}`
            }
          >
            {item.image ? (
              <img src={item.image} alt={item.label} />
            ) : (
              <span>{item.label}</span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Auth & Theme Buttons */}
      <div className="d-flex justify-content-end align-items-center">
        {user ? (
          <UserInfo user={user} />
        ) : (
          <>
            <NavLink
              to="#"
              className="custom-buttton nav-items"
              onClick={toggleLoginModal}
            >
              SIGN IN
            </NavLink>

            <LoginPopup isOpen={isLoginModalOpen} toggle={toggleLoginModal} />
            <NavLink
              to="#"
              className="ms-2 custom-buttton nav-items"
              onClick={toggleRegisterModal}
            >
              REGISTER
            </NavLink>
            <RegisterPopup
              isOpen={isRegisterModalOpen}
              toggle={toggleRegisterModal}
            />
          </>
        )}
        {isWelcome && (
          <WelcomePopup
            isOpen={isWelcome}
            onClose={() => {
              localStorage.setItem('isWelcome', false);
              setIsWelcome(false);
            }}
          />
        )}
      </div>
    </StickyHeader>
  );
}

export default Topnav;
