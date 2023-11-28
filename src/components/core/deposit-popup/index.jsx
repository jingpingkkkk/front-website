/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Modal } from 'reactstrap';
import './deposit.css';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import ToastAlert from '../../../helper/toast-alert';
import { handleFormData, postRequest } from '../../../api';

const imageTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/svg+xml',
  'image/svg',
];

function DepositPopup({ isOpen, toggle }) {
  const userDetails = useSelector((state) => state.userDetails);
  const {
    handleSubmit,
    setValue,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const [imageError, setImageError] = useState(null);
  const [imageReqError, setImageReqError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageReqError('');
      setImageError('');
      if (!imageTypes.includes(file?.type)) {
        setImageError('Invalid file!');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setValue('depositScreenShot', file);
      setSelectedImage(imageUrl);
    }
  };
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    ToastAlert.success('Text copied to the clipboard.');
  };

  const onSubmit = async () => {
    if (!selectedImage) {
      setImageReqError('Deposit screenshot is required');
    }
    const formData = new FormData();
    formData.append('depositScreenShot', getValues('depositScreenShot'));
    formData.append('amount', getValues('amount'));
    formData.append('utrTransactionId', getValues('utrTransactionId'));
    formData.append('userId', userDetails?.user?._id);
    formData.append('transferTypeId', selectedTransaction?._id);
    formData.append('parentUserId', userDetails?.user?.superUserId);

    setAddLoading(true);
    try {
      const result = await handleFormData(
        'depositRequest/createDepositRequest',
        formData,
      );
      if (result?.success) {
        ToastAlert.success('Deposit request created successfully');
        toggle();
      } else {
        ToastAlert.error(result?.message || '');
        setAddLoading(false);
      }
    } catch (err) {
      setAddLoading(false);
    }
  };

  useEffect(() => {
    const fetchTransactionTypeList = async () => {
      setLoading(true);
      const body = {
        parentUserId: userDetails?.user?.superUserId,
      };
      const result = await postRequest('exchangeHome/getTransferType', body);
      if (result?.success) {
        setTransactionTypes(result?.data?.records || []);
        setSelectedTransaction(result?.data?.records[0]);
      }
      setLoading(false);
    };

    fetchTransactionTypeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          <img alt="ac-title-bg" src="/images/ac-title-bg.png" />
          <span className="title"> Make a Deposit </span>
        </span>
      </h5>
      <div className="deposit-modal-content">
        <div className="modal-body">
          <div className="payment-method">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bank-transfer">
                <div className="select-transfer">
                  {!loading
                    ? transactionTypes?.length
                      ? transactionTypes?.map((transactionType) => (
                          <button
                            type="button"
                            className={`payment-btn ${
                              transactionType?._id === selectedTransaction?._id
                                ? 'active'
                                : ''
                            }`}
                            key={transactionType?._id}
                            onClick={() =>
                              setSelectedTransaction(transactionType)
                            }
                          >
                            {transactionType?.type || ''}
                          </button>
                        ))
                      : ''
                    : ''}
                </div>
                {selectedTransaction ? (
                  <div className="pay-details">
                    <div className="title">
                      Make your payment on the details below
                    </div>
                    <div className="phone-pay-details">
                      {selectedTransaction?.type === 'cash' ? (
                        <div className="payment-details">
                          <div className="title">Number</div>
                          <div className="sub-title">
                            {selectedTransaction?.mobileNumber || ''}
                            <button
                              type="button"
                              className="copy-img"
                              onClick={() =>
                                copyText(selectedTransaction?.mobileNumber)
                              }
                            >
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
                            </button>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                      {selectedTransaction?.type === 'bank' ? (
                        <>
                          <div className="payment-details">
                            <div className="title">Bank Name</div>
                            <div className="sub-title">
                              {selectedTransaction?.bankName || ''}
                              <button
                                type="button"
                                className="copy-img"
                                onClick={() =>
                                  copyText(selectedTransaction?.bankName)
                                }
                              >
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
                              </button>
                            </div>
                          </div>
                          <div className="payment-details">
                            <div className="title">Account Holder Name</div>
                            <div className="sub-title">
                              {selectedTransaction?.accountHolderName || ''}
                              <button
                                type="button"
                                className="copy-img"
                                onClick={() =>
                                  copyText(
                                    selectedTransaction?.accountHolderName,
                                  )
                                }
                              >
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
                              </button>
                            </div>
                          </div>
                          <div className="payment-details">
                            <div className="title">Account Number</div>
                            <div className="sub-title">
                              {selectedTransaction?.accountNumber || ''}
                              <button
                                type="button"
                                className="copy-img"
                                onClick={() =>
                                  copyText(selectedTransaction?.accountNumber)
                                }
                              >
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
                              </button>
                            </div>
                          </div>
                          <div className="payment-details">
                            <div className="title">IFSC</div>
                            <div className="sub-title">
                              {selectedTransaction?.ifsc || ''}
                              <button
                                type="button"
                                className="copy-img"
                                onClick={() =>
                                  copyText(selectedTransaction?.ifsc)
                                }
                              >
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
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                      {selectedTransaction?.type === 'platform' ? (
                        <>
                          <div className="payment-details">
                            <div className="title">Platform Name </div>
                            <div className="sub-title text-uppercase">
                              {selectedTransaction?.platformName || ''}
                              <button
                                type="button"
                                className="copy-img"
                                onClick={() =>
                                  copyText(selectedTransaction?.platformName)
                                }
                              >
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
                              </button>
                            </div>
                          </div>
                          <div className="payment-details">
                            <div className="title">Platform Display Name </div>
                            <div className="sub-title">
                              {selectedTransaction?.platformDisplayName || ''}
                              <button
                                type="button"
                                className="copy-img"
                                onClick={() =>
                                  copyText(
                                    selectedTransaction?.platformDisplayName,
                                  )
                                }
                              >
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
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                      {selectedTransaction?.type === 'link' ? (
                        <div className="payment-details">
                          <div className="title">Deposit Link</div>
                          <div className="sub-title">
                            <a
                              href={selectedTransaction?.depositLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {selectedTransaction?.depositLink || ''}
                            </a>
                            <button
                              type="button"
                              className="copy-img"
                              onClick={() =>
                                copyText(selectedTransaction?.depositLink)
                              }
                            >
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
                            </button>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}

                      <div className="payment-details qr-code">
                        <div className="qr-title">Scan Qr Code</div>
                        <div className="sub-title">
                          <img
                            className="qr-code responsive-img"
                            src={selectedTransaction?.transferTypeImage}
                            alt="QR"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {imageError ? (
                  <div className="text-danger">{imageError}</div>
                ) : (
                  ''
                )}
                <div className="utr-amount-details">
                  <div className="left-content">
                    <div className="amount-bg">
                      <div className="amount input-field">
                        <input
                          type="number"
                          maxLength="8"
                          placeholder="500"
                          name="amount"
                          {...register('amount', {
                            required: 'Amount is required',
                            min: {
                              value: selectedTransaction?.minAmount || 0,
                              message: `Amount must be at least ${
                                selectedTransaction?.minAmount || 0
                              }`,
                            },
                            max: {
                              value: selectedTransaction?.maxAmount || 0,
                              message: `Amount must not exceed ${
                                selectedTransaction?.maxAmount || 0
                              }`,
                            },
                          })}
                        />
                      </div>
                      <div className="center-align add-amount">
                        you can add upto{' '}
                        <strong>{selectedTransaction?.maxAmount || 0},</strong>{' '}
                        minimum{' '}
                        <strong>{selectedTransaction?.minAmount || 0}</strong>{' '}
                        required{' '}
                      </div>
                      {errors?.amount ? (
                        <div className="error-msg">
                          {errors?.amount?.message}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="amount-bg">
                      <div className="amount input-field">
                        <input
                          placeholder="Enter UTR transaction id"
                          type="text"
                          name="utrTransactionId"
                          {...register('utrTransactionId', {
                            required: 'UTR transaction id is required',
                          })}
                        />
                      </div>
                      {errors?.utrTransactionId ? (
                        <div className="error-msg">
                          {errors?.utrTransactionId?.message}
                        </div>
                      ) : (
                        ''
                      )}
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
                            name="depositScreenShot"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                    </div>
                    {imageReqError ? (
                      <div className="error-msg">{imageReqError}</div>
                    ) : (
                      ''
                    )}
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
                  <button
                    type="submit"
                    className="btn"
                    disabled={!selectedTransaction?._id || addLoading}
                  >
                    <span className="animate-btn">
                      {addLoading && (
                        <span className="spinner-border spinner-border-sm me-2" />
                      )}
                      Submit
                    </span>
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
