import React, { useEffect, useState } from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { io } from 'socket.io-client';
import './userInfo.css';

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const userUrl = `${socketUrl}/user`;
const socket = io(userUrl, {
  auth: {
    token: localStorage.getItem('userToken'),
  },
  autoConnect: false,
});

const UserInfo = ({ user }) => {
  const [userInfo, setUserInfo] = useState(user);

  useEffect(() => {
    socket.on(`user:${user._id}`, (data) => {
      setUserInfo(data);
      localStorage.setItem('user', JSON.stringify(data));
    });

    socket.connect();
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
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
          <DropdownItem>Current Bets</DropdownItem>
          <DropdownItem>Casino Results</DropdownItem>
          <DropdownItem>Set Button Value</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => logout()}>Logout</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default UserInfo;
