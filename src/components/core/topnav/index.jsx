import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { postRequest } from '../../../api';
import useScreenWidth from '../../../hooks/use-screen-width';
import { setLoginPopup } from '../../../redux/reducers/login-popup';
import {
  setThemeLoading,
  setThemeSettings,
} from '../../../redux/reducers/theme-settings';
import {
  setShouldLogin,
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
  const navigate = useNavigate();

  const { themeSettings } = useSelector((state) => state.themeSettings);
  const { shouldLogin } = useSelector((state) => state.userDetails);
  const { isLogingOpen } = useSelector((state) => state.loginDetails);
  const userDetails = useSelector((state) => state.userDetails);
  const { isMobile, isTablet } = useScreenWidth();
  const imageURL =
    isMobile || isTablet
      ? themeSettings?.welcomeMobileImage
      : themeSettings?.welcomeDesktopImage;

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(isLogingOpen);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [user, setUser] = useState('');
  const [isWelcome, setIsWelcome] = useState(false);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
    dispatch(setLoginPopup(!isLoginModalOpen));
  };
  const toggleRegisterModal = () => {
    setIsRegisterModalOpen(!isRegisterModalOpen);
  };

  const getThemeSettings = async () => {
    dispatch(setThemeLoading(true));
    // const ipAddress = await ipDetails();
    const body = {
      // countryName: ipAddress?.country,
      countryName: 'IN',
      domainUrl: window?.location?.origin,
    };
    const result = await postRequest(
      'themeSetting/themeSettingByCurrencyAndDomain',
      body,
      false,
    );
    if (result.success) {
      const data = result?.data?.details;
      dispatch(setThemeSettings(data));
      dispatch(setThemeLoading(false));
    }
  };

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
    const token = localStorage.getItem('userToken');
    if (!token) return;
    const result = await postRequest('users/rehydrateUser');
    if (result.success) {
      dispatch(setUserDetails(result.data.details));
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      await rehydrateUser();
    }, 1000 * 10);
    Promise.all([rehydrateUser(), getThemeSettings(), getUserStakeButtons()]);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shouldLogin) {
      toggleLoginModal();
      dispatch(setShouldLogin(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldLogin]);

  useEffect(() => {
    if (localStorage.getItem('isWelcome') === 'true') {
      setIsWelcome(true);
    }
    if (userDetails?.user?._id) {
      setUser(userDetails.user);
    }
    setIsLoginModalOpen(isLogingOpen);
  }, [isWelcome, isLoginModalOpen, isLogingOpen, userDetails?.user]);

  const onchangeMenu = (e, path) => {
    if (path !== '/sports') {
      e?.preventDefault();
    } else {
      navigate(path);
    }
  };

  return (
    <StickyHeader>
      {/* Mobile View */}
      <div className="d-lg-none">
        <MenuToggleButton />

        <NavLink to="/" className="ms-5">
          <img
            src={
              themeSettings?.logoImage
                ? themeSettings?.logoImage
                : 'images/logo.png'
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = 'images/logo.png';
            }}
            width="125"
            alt="Exchange"
            style={{ paddingTop: '0.75rem' }}
          />
        </NavLink>
      </div>

      {/* Logo - Desktop View */}
      <NavLink to="/" className="d-none d-lg-block">
        <img
          src={
            themeSettings?.logoImage
              ? themeSettings?.logoImage
              : 'images/logo.png'
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = 'images/logo.png';
          }}
          width="150"
          alt="Exchange"
          style={{ paddingTop: '0.75rem' }}
        />
      </NavLink>

      {/* Nav Items */}
      <div className="d-none d-lg-flex align-items-center">
        {topNavItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `me-4 nav-items ${isActive ? 'custom-buttton active' : ''}`
            }
            onClick={(e) => {
              onchangeMenu(e, item.path);
            }}
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
            {/* <NavLink
              to="#"
              className="ms-2 custom-buttton nav-items"
              onClick={toggleRegisterModal}
            >
              REGISTER
            </NavLink> */}
            <RegisterPopup
              isOpen={isRegisterModalOpen}
              toggle={toggleRegisterModal}
            />
          </>
        )}
        {isWelcome && imageURL && (
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
