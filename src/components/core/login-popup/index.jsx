/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Modal } from 'reactstrap';
import { postRequest } from '../../../api';
import {
  setShouldLogin,
  setStakeButtons,
  setUserDetails,
} from '../../../redux/reducers/user-details';
import RegisterPopup from '../register-popup';
import './login-popup.css';

const LoginPopup = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const navigate = useNavigate();
  const getUserStakeButtons = async () => {
    const result = await postRequest('stake/getUserStakes');
    if (result?.success) {
      if (result?.data?.details?.length) {
        const gameButtons = result.data.details.find(
          (el) => el.stakeType === 'games',
        );
        const casinoButtons = result.data.details.find(
          (el) => el.stakeType === 'casino',
        );
        dispatch(setStakeButtons({ casinoButtons, gameButtons }));
      }
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // const ipaddress = await ipDetails();
      // if (ipaddress?.ip) {
      //   data.ipAddress = ipaddress?.ip;
      // }
      const result = await postRequest('auth/userLogin', data);
      if (result?.success) {
        // localStorage.setItem('user', JSON.stringify(result?.data?.user));
        localStorage.setItem('userToken', result?.data?.token);
        localStorage.setItem('isWelcome', true);

        dispatch(setUserDetails(result?.data?.user));
        dispatch(setShouldLogin(false));
        await getUserStakeButtons();

        setLoading(false);
        navigate('/', true);
      } else {
        setLoading(false);
        setError(result?.message || '');
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="login-modal"
        // centered
        id="login-modal"
      >
        <button type="button" className="modal-close right" onClick={toggle}>
          <img src="/images/close.svg" alt="close" />
        </button>
        <div className="login-modal lgn-modal-content">
          <div className="login-card">
            <div className="login-form">
              <div className="top-contents">
                <div className="login-logo">
                  <img loading="lazy" alt="" src="/images/logo.png" />
                </div>
                {error ? (
                  <div className="error-msg text-center pt-2">{error}</div>
                ) : (
                  ''
                )}
              </div>
              <div className="row mb-10 center-padding">
                <div className="col col-sm-12 col-md-12">
                  <div className="right-side-col col col-sm-12 col-md-6">
                    <div className="mobile_bg">
                      <img
                        alt="login-img"
                        loading="lazy"
                        src="/images/login-img-new.png"
                      />
                    </div>
                    <div className="bottom-icon">
                      <div className="withdraw">
                        100% <strong>FAST</strong> Withdrawal
                        <div>
                          <img
                            alt="payment"
                            loading="lazy"
                            src="/images/login-payment.png"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="left-side-col col col-sm-12 col-md-6">
                    <div className="login-detail">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mb-15">
                          <div className="input-field col col-sm-12 user_input">
                            <input
                              name="username"
                              id="username"
                              {...register('username', {
                                required: 'Username is required',
                              })}
                            />
                            <label htmlFor="user_name" className="active">
                              Enter your Username
                            </label>
                          </div>
                          {errors?.username ? (
                            <div className="error-msg">
                              {errors?.username?.message}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="row mb-5">
                          <div className="input-field col col-sm-12 user_input mb-0">
                            <input
                              placeholder=""
                              id="password"
                              type={`${showPwd ? 'text' : 'password'}`}
                              {...register('password', {
                                required: 'Password is required',
                              })}
                            />
                            <label htmlFor="password" className="active">
                              Enter your Password
                            </label>
                            <button
                              type="button"
                              onClick={() => setShowPwd(!showPwd)}
                              style={{ display: 'contents' }}
                            >
                              <img
                                src={`/images/${
                                  showPwd ? 'icon-eye-close' : 'icon-eye'
                                }.png`}
                                alt="close"
                                className="eye_icon"
                              />
                            </button>
                          </div>
                          {errors?.password ? (
                            <div className="error-msg">
                              {errors?.password?.message}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>

                        <div className="row margin mb-0">
                          <div className="input-field col col-sm-12 m-0 p-0 text-start">
                            <p className="remember-field left">
                              <label>
                                <input type="checkbox" className="filled-in " />
                                <span className="keep">Keep me signed in</span>
                              </label>
                            </p>
                          </div>
                        </div>
                        <div className="row mb-0 mt-10">
                          <button
                            type="submit"
                            className="btn loginButton"
                            disabled={loading}
                          >
                            {loading && (
                              <span className="spinner-border spinner-border-sm me-2" />
                            )}
                            Sign In
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="row mb-10 mt-1">
                      <div className="member">
                        Don&apos;t have an account?
                        <button
                          type="button"
                          className="bg-transparent text-secondary text-decoration-underline"
                          onClick={() => {
                            toggle({ isReg: true });
                          }}
                        >
                          &nbsp;Register
                        </button>
                      </div>
                    </div>
                    <div className="bottom-icon mt-10">
                      <div className="social-media">
                        <a target="_blank" href="/" rel="noreferrer">
                          <img
                            loading="lazy"
                            alt=""
                            className="responsive-img"
                            src="images/icon-fb-blue.png"
                          />
                        </a>
                        <a href="/">
                          <img
                            loading="lazy"
                            alt=""
                            className="responsive-img"
                            src="images/icon-insta-blue.png"
                          />
                        </a>
                        <a href="/">
                          <img
                            loading="lazy"
                            alt=""
                            className="responsive-img"
                            src="images/icon-you-tube-blue.png"
                          />
                        </a>
                        <a href="/">
                          <img
                            loading="lazy"
                            alt=""
                            className="responsive-img"
                            src="images/icon-whats-app-blue.png"
                          />
                        </a>
                        <a href="/">
                          <img
                            loading="lazy"
                            alt=""
                            className="responsive-img"
                            src="images/icon-twitter-blue.png"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {showRegisterPopup ? (
        <RegisterPopup
          isOpen={showRegisterPopup}
          toggle={setShowRegisterPopup(!showRegisterPopup)}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default LoginPopup;
