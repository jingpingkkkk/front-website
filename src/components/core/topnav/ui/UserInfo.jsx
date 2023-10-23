/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { io } from 'socket.io-client';
import countDays from '../../../../helper/day-count';
import { userLogout } from '../../../../helper/user';
import { resetUserDetails } from '../../../../redux/reducers/user-details';
import StateButtons from '../../stake-button-popup';
import NotificationPopup from './NotificationPopup';
import './userInfo.css';

const socketUrl = import.meta.env.VITE_SOCKET_URL;

const UserInfo = ({ user }) => {
  const userSocket = useMemo(() => {
    return io(`${socketUrl}/user`, {
      auth: { token: localStorage.getItem('userToken') },
      autoConnect: false,
    });
  }, []);

  const notificationSocket = useMemo(() => {
    return io(`${socketUrl}/event-notification`, { autoConnect: false });
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(user);
  const [showStakButton, setShowStakeButton] = useState(false);
  const [showNotificationDetail, setShowNotificationDetail] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [eventId, setEventId] = useState(null);
  const [eventName, setEventName] = useState(null);

  useEffect(() => {
    userSocket.on(`user:${user._id}`, (data) => {
      setUserInfo(data);
    });
    userSocket.connect();
    return () => {
      userSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    notificationSocket.emit('join:event:notification', setNotifications);
    notificationSocket.on('event:complete', (data) => {
      setNotifications((prev) => [data, ...prev]);
    });
    notificationSocket.connect();
    return () => {
      notificationSocket.off('event:complete');
      notificationSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    dispatch(resetUserDetails());
    userLogout();
  };

  const onOpenPage = () => {
    navigate('/currentbets');
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
        <span>| {userInfo?.exposure?.toFixed(2) || 0}</span>
      </div>
      <div className="d-flex">
        <UncontrolledDropdown className="d-none-mobile">
          <DropdownToggle caret color="dark" className="username-info">
            <span className="user-icon">
              <img src="./images/userrr.png" alt="user" />
            </span>
            {userInfo?.fullName || ''}
          </DropdownToggle>

          <DropdownMenu dark>
            <DropdownItem href="/accountstatement">
              Account Statement
            </DropdownItem>
            <DropdownItem onClick={onOpenPage}>Bet History</DropdownItem>
            <DropdownItem>Casino Results</DropdownItem>
            <DropdownItem onClick={() => setShowStakeButton(true)}>
              Set Button Value
            </DropdownItem>
            <DropdownItem href="/changepassword">Change Password</DropdownItem>
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
        <UncontrolledDropdown>
          <DropdownToggle caret className="notification-icon">
            <img
              src="./images/icons-bell.png"
              alt="bell-icon"
              className="w-50 h-50"
            />
          </DropdownToggle>

          <DropdownMenu className="notification-menu">
            <div className="card border-0 w300">
              <div className="card-header notification-header">
                <h5 className="mb-0">
                  <span>Notifications</span>
                </h5>
              </div>
              <div className="card-body p-0 notification-body">
                <div className="fade show active">
                  <ul className="list-unstyled list mb-0">
                    {notifications?.length ? (
                      notifications?.map((notification) => (
                        <li
                          className="notification-item"
                          key={notification?._id}
                        >
                          <div className="ps-2 pe-2">
                            <div className="d-flex justify-content-between">
                              <div
                                className="cursor-pointer w-75"
                                onClick={() => {
                                  setEventId(notification?._id);
                                  setEventName(notification?.name);
                                  setShowNotificationDetail(true);
                                }}
                              >
                                <span className="item-name">
                                  {notification?.name || ''}
                                </span>
                              </div>
                              <small className="notification-date w-25">
                                {countDays(notification?.matchDateTime)}
                              </small>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="notification-item border-0 text-center">
                        <div className="ps-2 pe-2">
                          <div className="d-flex justify-content-between">
                            <div className="cursor-pointer w-100">
                              <span className="item-name">No Data</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <a
                className="card-footer text-center border-top-0 notification-footer"
                href="/notifications"
              >
                View All Notifications
              </a>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>

      {showNotificationDetail && (
        <NotificationPopup
          isOpen={showNotificationDetail}
          closeModal={() => setShowNotificationDetail(!showNotificationDetail)}
          eventId={eventId}
          eventName={eventName}
        />
      )}
    </div>
  );
};

export default UserInfo;
