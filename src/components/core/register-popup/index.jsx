/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Modal } from 'reactstrap';
import PhoneInput from 'react-phone-input-2';
import { useSelector } from 'react-redux';
import { postRequest } from '../../../api';
import '../login-popup/login-popup.css';
import 'react-phone-input-2/lib/style.css';
import ToastAlert from '../../../helper/toast-alert';

const RegisterPopup = ({ isOpen, toggle }) => {
  const { themeSettings } = useSelector((state) => state.themeSettings);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const [mobileNo, setMobileNo] = useState(null);
  const navigate = useNavigate();

  const password = watch('password', '');
  const onSubmit = async (data) => {
    data.currencyId = themeSettings?.currencyId;
    data.mobileNumber = mobileNo;
    setLoading(true);
    try {
      const result = await postRequest('auth/register', data, false);
      if (result?.success) {
        ToastAlert.success('User registered successfully.');
        navigate('/', true);
      } else {
        setLoading(false);
        setError(result?.message || '');
      }
    } catch (err) {
      setLoading(false);
    }
  };
  function removePrefix(inputString, prefix) {
    if (inputString.startsWith(prefix)) {
      return inputString.slice(prefix.length);
    }
    return inputString;
  }

  const handlePhoneChange = (value, country) => {
    setValue('mobileNumber', value);
    setMobileNo(removePrefix(value, country.dialCode));
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="login-modal"
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
                      <div className="row mb-10">
                        <div className="input-field col col-sm-12 user_input">
                          <input
                            name="fullName"
                            id="fullName"
                            {...register('fullName', {
                              required: 'Full Name is required',
                            })}
                          />
                          <label htmlFor="user_name" className="active">
                            Enter your Full Name
                          </label>
                        </div>
                        {errors?.fullName ? (
                          <div className="error-msg">
                            {errors?.fullName?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="row mb-10">
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
                      <div className="row mb-10">
                        <div className="input-field col col-sm-12 user_input">
                          <Controller
                            name="mobileNumber"
                            control={control}
                            render={({ field }) => (
                              <PhoneInput
                                country="in"
                                inputProps={{
                                  className: 'custom-input',
                                }}
                                dropdownClass="custom-country-list"
                                {...field}
                                value={field.value}
                                onChange={handlePhoneChange}
                              />
                            )}
                            rules={{
                              required: 'Mobile number is required',
                            }}
                          />
                          <label htmlFor="user_name" className="active">
                            Enter your Mobile Number
                          </label>
                        </div>
                        {errors?.mobileNumber ? (
                          <div className="error-msg">
                            {errors?.mobileNumber?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="row mb-10">
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
                      <div className="row mb-15">
                        <div className="input-field col col-sm-12 user_input mb-0">
                          <input
                            placeholder=""
                            id="confirmPassword"
                            type={`${showPwd ? 'text' : 'password'}`}
                            {...register('confirmPassword', {
                              required: 'Password is required',
                              validate: (value) =>
                                value === password || 'Passwords do not match',
                            })}
                          />
                          <label htmlFor="confirmPassword" className="active">
                            Enter your Confirm Password
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
                        {errors?.confirmPassword ? (
                          <div className="error-msg">
                            {errors?.confirmPassword?.message}
                          </div>
                        ) : (
                          ''
                        )}
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
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="row mb-10 mt-1">
                    <div className="member">
                      Already have an account?
                      <button
                        type="button"
                        className="bg-transparent text-secondary text-decoration-underline"
                        onClick={() => {
                          toggle({ isLogin: true });
                        }}
                      >
                        &nbsp;SignIn
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
  );
};

export default RegisterPopup;
