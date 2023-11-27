import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import './deposit.css';

const imageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/svg+xml',
  'image/svg',
];

function DepositPopup({ isOpen, toggle }) {
  const [profileError, setProfileError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(profileError);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileError('');
      if (!imageTypes.includes(file?.type)) {
        setProfileError('ERROR');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      // setValue('profileImage', file);
      setSelectedImage(imageUrl);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="deposit-modal"
      // centered
      id="deposit-new"
    >
      <button type="button" className="modal-close right" onClick={toggle}>
        <img src="/images/close.svg" alt="close" />
      </button>
      <h5>
        <span className="card-title">
          <img
            alt=""
            src="https://cdn.cloudd.live/theme/aurapay_theme/aurapay/assets/images/ac-title-bg.png?v=1.1"
          />
          <span className="title"> Make a Deposit </span>
        </span>
      </h5>
      <div className="deposit-modal-content">
        <div className="modal-body">
          <div className="payment-method">
            <form>
              <div className="bank-transfer">
                <div className="select-transfer">
                  <button type="button" className="active payment-btn">
                    <img
                      alt=""
                      loading="lazy"
                      className="responsive-img"
                      src="https://cdn.cloudd.live//PaymentMode/20221120183889.png"
                    />
                  </button>
                  <button type="button" className="payment-btn">
                    <img
                      alt=""
                      loading="lazy"
                      className="responsive-img"
                      src="https://cdn.cloudd.live//PaymentMode/20220108073504.png"
                    />
                  </button>
                  <button type="button" className="payment-btn">
                    <img
                      alt=""
                      loading="lazy"
                      className="responsive-img"
                      src="https://cdn.cloudd.live//PaymentMode/20220111063244.png"
                    />
                  </button>
                </div>
                <div className="pay-details">
                  <div className="title">
                    Make your payment on the details below
                  </div>
                  <div className="phone-pay-details">
                    <div className="payment-details">
                      <div className="title">PhonePe Number</div>
                      <div className="sub-title">
                        8269951408
                        <span className="copy-img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M19.5 1.5H6.9375C6.83437 1.5 6.75 1.58437 6.75 1.6875V3C6.75 3.10312 6.83437 3.1875 6.9375 3.1875H18.5625V19.3125C18.5625 19.4156 18.6469 19.5 18.75 19.5H20.0625C20.1656 19.5 20.25 19.4156 20.25 19.3125V2.25C20.25 1.83516 19.9148 1.5 19.5 1.5ZM16.5 4.5H4.5C4.08516 4.5 3.75 4.83516 3.75 5.25V17.6883C3.75 17.8875 3.82969 18.0773 3.97031 18.218L8.03203 22.2797C8.08359 22.3312 8.14219 22.3734 8.20547 22.4086V22.4531H8.30391C8.38594 22.4836 8.47266 22.5 8.56172 22.5H16.5C16.9148 22.5 17.25 22.1648 17.25 21.75V5.25C17.25 4.83516 16.9148 4.5 16.5 4.5ZM8.20312 20.0672L6.18516 18.0469H8.20312V20.0672ZM15.5625 20.8125H9.70312V17.4844C9.70312 16.9664 9.28359 16.5469 8.76562 16.5469H5.4375V6.1875H15.5625V20.8125Z"
                              fill="#003566"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="payment-details">
                      <div className="title">PhonePe UPI ID </div>
                      <div className="sub-title">
                        8269951408@ibl
                        <span className="copy-img">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M19.5 1.5H6.9375C6.83437 1.5 6.75 1.58437 6.75 1.6875V3C6.75 3.10312 6.83437 3.1875 6.9375 3.1875H18.5625V19.3125C18.5625 19.4156 18.6469 19.5 18.75 19.5H20.0625C20.1656 19.5 20.25 19.4156 20.25 19.3125V2.25C20.25 1.83516 19.9148 1.5 19.5 1.5ZM16.5 4.5H4.5C4.08516 4.5 3.75 4.83516 3.75 5.25V17.6883C3.75 17.8875 3.82969 18.0773 3.97031 18.218L8.03203 22.2797C8.08359 22.3312 8.14219 22.3734 8.20547 22.4086V22.4531H8.30391C8.38594 22.4836 8.47266 22.5 8.56172 22.5H16.5C16.9148 22.5 17.25 22.1648 17.25 21.75V5.25C17.25 4.83516 16.9148 4.5 16.5 4.5ZM8.20312 20.0672L6.18516 18.0469H8.20312V20.0672ZM15.5625 20.8125H9.70312V17.4844C9.70312 16.9664 9.28359 16.5469 8.76562 16.5469H5.4375V6.1875H15.5625V20.8125Z"
                              fill="#003566"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="payment-details">
                      <div className="qr-title">Scan Qr Code</div>
                      <div className="sub-title">
                        <img
                          className="qr-code responsive-img"
                          src="https://cdn.cloudd.live//Payment/20230649045927.jpeg"
                          alt="QR"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="utr-amount-details">
                  <div className="left-content">
                    <div className="amount-bg">
                      <div className="amount input-field">
                        <input
                          type="number"
                          maxLength="8"
                          className="validate ng-untouched ng-pristine ng-invalid"
                          placeholder="500"
                        />
                      </div>
                      <div className="center-align add-amount">
                        {' '}
                        you can add upto <strong>500000,</strong> minimum{' '}
                        <strong>100</strong> required{' '}
                      </div>
                    </div>
                    <div className="amount-bg">
                      <div className="amount input-field">
                        <input
                          placeholder="Enter UTR transaction id"
                          type="text"
                          className="validate ng-untouched ng-pristine ng-invalid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="right-content pay-details">
                    <div className="upload_ss">
                      <div className="file-field upload-id">
                        <div className="btn">
                          {selectedImage ? (
                            <div className="document-image">
                              <img src={selectedImage} alt="plus" />
                            </div>
                          ) : (
                            <>
                              <span>
                                <img src="/images/icon-plus.svg" alt="plus" />
                              </span>
                              <span className="upload-title">
                                Click here to upload Payment Screenshot
                              </span>
                            </>
                          )}

                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="user-warning-note ng-star-inserted">
                  <div className="title">
                    <img src="/images/icon-alert-red.png" alt="alert" /> note:
                  </div>
                  <div className="note-content">
                    Our bank accounts or payment details keep changing check the
                    payment details before depositing. If you deposited in other
                    account witch is not currently listed on site then we are
                    not responsible for your loss.
                  </div>
                </div>
                <div className="submit-btn">
                  <button type="button" className="btn">
                    <span className="animate-btn"> Submit </span>
                  </button>
                </div>
              </div>
            </form>
            <div className="payment-footer">
              <p>
                Accept, process &amp; disburse digital payments for your
                business. <br />
                <span className="text-success">Fast &amp; Secure Payment</span>
              </p>
              <img
                alt=""
                className="m-auto responsive-img"
                src="https://cdn.cloudd.live/content/assets/images/payment-footer-logo.png?v=1.0.5"
              />
              <img
                alt=""
                className="m-auto responsive-img"
                src="https://cdn.cloudd.live/content/assets/images/payment-footer-logo-2.png?v=1.0.5"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DepositPopup;
