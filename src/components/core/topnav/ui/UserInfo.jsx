import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { io } from 'socket.io-client';
import { userLogout } from '../../../../helper/user';
import { resetUserDetails } from '../../../../redux/reducers/user-details';
import StateButtons from '../../stake-button-popup';
import './userInfo.css';

// const UserInfo = ({ user }) => {
//   const [showStakButton, setShowStakeButton] = useState(false);

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const userUrl = `${socketUrl}/user`;
const socket = io(userUrl, {
  auth: { token: localStorage.getItem('userToken') },
  autoConnect: false,
});

const UserInfo = ({ user }) => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState(user);
  const [showStakButton, setShowStakeButton] = useState(false);

  useEffect(() => {
    socket.on(`user:${user._id}`, (data) => {
      setUserInfo(data);
      // localStorage.setItem('user', JSON.stringify(data));
    });
    socket.connect();
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    dispatch(resetUserDetails());
    userLogout();
  };

  return (
    <div className="header-right">
      <div className="balance d-none-mobile rounded">
        <div>
          <img src="./images/ico2.png" alt="wallet" />
        </div>

        <table>
          <tbody>
            <tr>
              <td className="balance-value">pts:</td>
              <td className="ps-1 small text-end">{userInfo?.balance || 0}</td>
            </tr>
            <tr>
              <td className="balance-value">exp:</td>
              <td className="ps-1 small text-end">
                {userInfo?.exposure
                  ? -parseFloat(userInfo.exposure.toFixed(2))
                  : 0}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center d-none-desktop bal-point">
        pts:
        <span>{user?.balance || 0}</span>{' '}
        <span>| {userInfo?.exposure || 0}</span>
      </div>

      <UncontrolledDropdown>
        <DropdownToggle caret color="dark" className="username-info">
          <span className="user-icon">
            <img src="./images/userrr.png" alt="user" />
          </span>
          {userInfo?.fullName || ''}
        </DropdownToggle>

        <DropdownMenu dark>
          <DropdownItem>Account Statement</DropdownItem>
          <DropdownItem href="/currentbets">Current Bets</DropdownItem>
          <DropdownItem>Casino Results</DropdownItem>
          <DropdownItem onClick={() => setShowStakeButton(true)}>
            Set Button Value
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      {showStakButton && (
        <StateButtons
          isOpen={showStakButton}
          closeModal={() => setShowStakeButton(!showStakButton)}
        />
      )}
      {/* Notification */}
      <div className="notification-icon dropdown" data-bs-toggle="dropdown">
        <img
          src="./images/icons-bell.png"
          alt="bell-icon"
          className="w-50 h-50"
        />
      </div>
      <ul className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-arrow border-0 notifications">
        <div
          id="NotificationsDiv"
          className="dropdown-menu rounded-lg  border-0 dropdown-animation dropdown-menu-sm-end p-0 m-0 show"
          data-bs-popper="static"
        >
          <div>Notification</div>
        </div>
      </ul>
    </div>
  );
};

export default UserInfo;
