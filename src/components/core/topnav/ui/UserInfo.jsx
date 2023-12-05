/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';
import { io } from 'socket.io-client';
import { postRequest } from '../../../../api';
import countDays from '../../../../helper/day-count';
import { userLogout } from '../../../../helper/user';
import { resetUserDetails } from '../../../../redux/reducers/user-details';
import StateButtons from '../../stake-button-popup';
import ExposureDetail from './ExposureDetail';
import NotificationPopup from './NotificationPopup';
import './userInfo.css';
import DepositPopup from '../../deposit-popup';

const socketUrl = import.meta.env.VITE_SOCKET_URL;

const UserInfo = ({ user }) => {
  const { themeSettings } = useSelector((state) => state.themeSettings);
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
  const [showExposureDetail, setShowExposureDetail] = useState(false);
  const [count, setCount] = useState(0);
  const [showDepositPopup, setShowDepositPopup] = useState(false);

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

  const onUpdateCount = () => {
    localStorage.setItem('seenNotification', JSON.stringify(notifications));
    setCount(0);
  };
  useEffect(() => {
    const localNotification = JSON.parse(localStorage.getItem('notification'));
    const seenNotification = JSON.parse(
      localStorage.getItem('seenNotification'),
    );
    if (seenNotification?.length) {
      const newNotification = seenNotification?.filter((newObj) =>
        localNotification?.some((oldObj) => newObj._id === oldObj._id),
      );
      localStorage.setItem('seenNotification', JSON.stringify(newNotification));
    }
    const newObjectsArray = localNotification?.filter(
      (newObj) =>
        !seenNotification?.some((oldObj) => newObj._id === oldObj._id),
    );
    setCount(newObjectsArray?.length || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications?.length]);

  useEffect(() => {
    notificationSocket.emit(
      'join:event:notification',
      { userId: user._id },
      setNotifications,
    );
    notificationSocket.on('event:complete', (data) => {
      setNotifications((prev) => [data, ...prev]);
      localStorage.setItem('notification', JSON.stringify(notifications));
    });
    notificationSocket.connect();
    return () => {
      notificationSocket.off('event:complete');
      notificationSocket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      const result = await postRequest('event/completedEventList', {
        startData: moment().subtract(1, 'days').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      });
      if (result?.success) {
        setNotifications(result?.data?.details || []);
        localStorage.setItem(
          'notification',
          JSON.stringify(result?.data?.details),
        );
      }
    };
    const interval = setInterval(async () => {
      await fetchNotifications();
    }, 1000 * 10);
    fetchNotifications();
    return () => {
      clearInterval(interval);
    };
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
              <td className="balance-value text-muted">pts:</td>
              <td className="px-1 small text-end">
                {userInfo?.balance
                  ? parseFloat(userInfo.balance.toFixed(2))
                  : 0}
              </td>
            </tr>
            <tr>
              <td className="balance-value text-muted">exp:</td>
              <td className="px-1 text-end">
                <button
                  type="button"
                  className={`bg-transparent pe-0 me-0 ${
                    userInfo?.exposure <= 0
                      ? 'exp-disabled'
                      : 'text-decoration-underline'
                  }`}
                  disabled={userInfo?.exposure <= 0}
                  onClick={() => setShowExposureDetail(true)}
                  style={{ userSelect: 'none' }}
                >
                  {userInfo?.exposure
                    ? -parseFloat(userInfo.exposure.toFixed(2))
                    : 0}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center d-n-desktop bal-point">
        pts:
        <span>{user?.balance || 0}</span>
        <span> | </span>
        <span
          className={`exposure ${
            userInfo?.exposure <= 0
              ? 'exp-disabled'
              : 'text-decoration-underline'
          }`}
          onClick={() =>
            userInfo?.exposure > 0 ? setShowExposureDetail(true) : ''
          }
        >
          {userInfo?.exposure ? -parseFloat(userInfo.exposure.toFixed(2)) : 0}
        </span>
      </div>

      <div className="d-flex align-items-center">
        <UncontrolledDropdown>
          <DropdownToggle caret color="dark" className="username-info">
            <span className="user-icon">
              <img src="./images/userrr.png" alt="user" />
            </span>
            {userInfo?.fullName || ''}
          </DropdownToggle>

          <DropdownMenu dark>
            <DropdownItem onClick={() => navigate('/accountstatement')}>
              Account Statement
            </DropdownItem>

            <DropdownItem onClick={() => navigate('/withdraw')}>
              Withdraw
            </DropdownItem>

            <DropdownItem onClick={() => navigate('/currentbets')}>
              Bet History
            </DropdownItem>

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
        {(themeSettings?.businessType &&
          themeSettings?.businessType !== 'b2b') ||
        user?.businessType !== 'b2b' ? (
          <button
            type="button"
            className="btn deposit"
            onClick={() => setShowDepositPopup(!showDepositPopup)}
          >
            Deposit
          </button>
        ) : (
          ''
        )}
        {/* Notification */}
        <UncontrolledDropdown className="notification-drop">
          <DropdownToggle
            className="notification-icon"
            onClick={onUpdateCount}
          />
          <span className="notification-count">{count}</span>
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

      {showExposureDetail ? (
        <ExposureDetail
          isOpen={showExposureDetail}
          toggle={() => {
            setShowExposureDetail(false);
          }}
        />
      ) : null}

      {showDepositPopup ? (
        <DepositPopup
          isOpen={showDepositPopup}
          toggle={() => {
            setShowDepositPopup(false);
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default UserInfo;
