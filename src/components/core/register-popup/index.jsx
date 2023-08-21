import React, { useState } from 'react';
import { Label, Modal, ModalBody } from 'reactstrap';
import './register-popup.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const RegisterPopup = ({ isOpen, toggle }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleLogin = () => {
    // Implement your signup logic here
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="register-modal" size="lg">
      <div className="modal-header">
        <div className="close-register-modal">
          <h5 className="modal-title">Register</h5>
          <button type="button" className="close-btn" onClick={toggle}>
            <img src="./images/close.svg" alt="close" />
          </button>
        </div>
      </div>
      <ModalBody>
        <form className="register-form">
          <div className="whatsapp-box">
            <div>
              <span>Register as New User</span>
              <h4>Get your instant ID from whatsapp</h4>
            </div>
            <a href="/" className="create-whatsapp-link">
              <div className="whatsapp-icon">
                <img src="images/whatsapp.png" alt="" />
              </div>
              <div className="click-here">click here</div>
            </a>
          </div>
          <div className="create-account-seperator">OR</div>
          <div className="register-fields">
            <div className="form-group regi-half">
              <Label for="username" className="login-label">
                Username
              </Label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter Username"
                className="form-control"
              />
            </div>
            <div className="form-group regi-half">
              <Label for="phone" className="login-label">
                Phone Number*
              </Label>
              <PhoneInput
                country="in"
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                className="select-country-container"
                countryCodeEditable={false}
              />
            </div>
            <div className="form-group regi-half">
              <Label for="username" className="login-label">
                New Password *
              </Label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="New Password"
                className="form-control"
              />
            </div>
            <div className="form-group regi-half">
              <Label for="username" className="login-label">
                Confirm Password *
              </Label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>
            <div className="form-group regi-half">
              <Label for="username" className="login-label">
                currency *
              </Label>
              <select className="form-select">
                <option>Select Currency</option>
                <option>INR</option>
                <option>BDT</option>
                <option>NPR</option>
                <option>PKR</option>
              </select>
            </div>
            <div className="form-group regi-half">
              <Label for="username" className="login-label">
                Referrer Code
              </Label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Referrer Code"
              />
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
          <div className="form-group">
            <button
              type="button"
              className="btn signup-buttton"
              onClick={handleLogin}
            >
              Sign Up
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

export default RegisterPopup;
