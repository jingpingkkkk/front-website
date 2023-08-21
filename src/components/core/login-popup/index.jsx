import React, { useState } from 'react';
import { Label, Modal, ModalBody } from 'reactstrap';
import './login-popup.css';

const LoginPopup = ({ isOpen, toggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    // Implement your login logic here
    setEmail('');
    setPassword('');
  };

  const isLoginDisabled = !email || !password;
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="login-modal">
      <div className="modal-header">
        <div className="close-login-modal">
          <h5 className="modal-title">Login</h5>
          <button type="button" className="close-btn" onClick={toggle}>
            <img src="./images/close.svg" alt="close" />
          </button>
        </div>
      </div>
      <ModalBody>
        <form className="login-form">
          <div className="form-group">
            <Label for="username" className="login-label">
              Username
            </Label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <Label for="password" className="login-label">
              Password
            </Label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="forgot-password">
              <a href="/">
                <u>Forgot Password?</u>
              </a>
            </div>
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox d-inline-block">
              <input
                type="checkbox"
                id="customCheck"
                name="example1"
                className="custom-control-checkbox"
              />
              <Label for="customCheck" className="custom-control-label">
                I am at least
                <a href="/" className="text-danger" role="button">
                  18 years
                </a>
                of age and I have read, accept and agree to the
                <a href="/terms-and-conditions" className="" target="_blank">
                  Terms and Conditions
                </a>
                ,
                <a href="/responsible-gaming" className="" target="_blank">
                  Responsible Gaming
                </a>
                ,
                <a href="/aml-policy" className="" target="_blank">
                  AML Policy
                </a>
                ,
                <a href="/kyc-policy" className="" target="_blank">
                  KYC Policy
                </a>
                ,<a href="/">GamCare</a>,<a href="/">Gambling Therapy</a>
              </Label>
            </div>
          </div>
          <div className="form-group mb-1">
            <button
              type="button"
              className="btn login-btn"
              disabled={isLoginDisabled}
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
          <small className="recaptchaTerms">
            This site is protected by reCAPTCHA and the Google
            <a href="/">Privacy Policy</a> and
            <a href="/">Terms of Service</a> apply.
          </small>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default LoginPopup;
