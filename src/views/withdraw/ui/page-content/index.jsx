/* eslint-disable no-nested-ternary */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Label } from 'reactstrap';
import { handleFormData, postRequest } from '../../../../api';
import ToastAlert from '../../../../helper/toast-alert';
import './withdraw.css';

const typeList = [
  { id: 'cash', lable: 'Cash' },
  { id: 'bank', lable: 'Bank' },
  { id: 'platform', lable: 'Platform' },
  { id: 'link', lable: 'Link' },
];

function WithdrawPageContent() {
  const userDetails = useSelector((state) => state.userDetails);
  const [isAddNew, setIsAddNew] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    reset,
    clearErrors,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [transferType, setTransferType] = useState(null);
  const [amount, setAmount] = useState(0);
  const [withdrawError, setWithdrawError] = useState({
    amount: '',
    transferType: '',
  });

  const selectedType = watch('type');

  const onSubmit = async (data) => {
    setAddLoading(true);
    try {
      const formData = new FormData(); // Create a new FormData object
      formData.append('userId', userDetails?.user?._id);
      formData.append('parentUserId', userDetails?.user?.superUserId);
      formData.append('qrImage', getValues('qrImage'));
      formData.append('transferType', 'withdrawal');
      delete data.qrImage;
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const result = await handleFormData(
        'transferType/createTransferType',
        formData,
      );
      if (result?.success) {
        ToastAlert.success('Transfer type added Successfully');
        setAddLoading(false);
        reset();
      } else {
        setAddLoading(false);
        ToastAlert.error(result?.message);
      }
    } catch (err) {
      setAddLoading(false);
    }
  };

  const onChangeAmount = (value) => {
    const amt = value;
    setAmount(value);
    const withdrawableAmt =
      userDetails.user.balance - userDetails.user.exposure;
    if (!amt) {
      setWithdrawError((prevErrors) => ({
        ...prevErrors,
        amount: 'Amount is required',
      }));
    } else if (amt && amt < 100) {
      setWithdrawError((prevErrors) => ({
        ...prevErrors,
        amount: 'Minimum 100 is required',
      }));
    } else if (amt > withdrawableAmt) {
      setWithdrawError((prevErrors) => ({
        ...prevErrors,
        amount: `You can withdraw upto ${withdrawableAmt}`,
      }));
    } else {
      setWithdrawError((prevErrors) => ({
        ...prevErrors,
        amount: '',
      }));
    }
  };

  const onChangeTransferType = (transType) => {
    setTransferType(transType);
    if (transType === '' || transType === null) {
      setWithdrawError((prevErrors) => ({
        ...prevErrors,
        transferType: 'Transfer type is required',
      }));
    } else {
      setWithdrawError((prevErrors) => ({
        ...prevErrors,
        transferType: '',
      }));
    }
  };

  const onCheckVaidation = async () => {
    onChangeTransferType(transferType);
    onChangeAmount(amount);
  };

  const onSendWithdrawlaRequest = async () => {
    await onCheckVaidation();
    const isValid = Object.keys(withdrawError).length === 0;
    if (isValid) {
      console.log('CALL API', Object.keys(withdrawError));
    } else {
      console.log('ERROR');
    }
  };

  useEffect(() => {
    const fetchTransactionTypeList = async () => {
      setLoading(true);
      const body = {
        parentUserId: userDetails?.user?.superUserId,
        transferType: 'withdrawal',
        userId: userDetails?.user?._id,
      };
      const result = await postRequest('exchangeHome/getTransferType', body);
      if (result?.success) {
        setTransactionTypes(result?.data?.records || []);
      }
      setLoading(false);
    };

    fetchTransactionTypeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="comman-bg">
      <div className="password-box">
        <div className="report-title mb-3 justify-content-center">
          <div className="report-name">Withdraw</div>
        </div>
        <div className="tab-content">
          <div className="text-secondary">
            Your withdrawable amount is &#x20b9;
            <span className="text-success">
              {(userDetails.user.balance - userDetails.user.exposure).toFixed(
                2,
              )}
            </span>
          </div>

          {isAddNew ? (
            <form id="addTypeForm" onSubmit={handleSubmit(onSubmit)}>
              <div className="row mt-3">
                <div className="col-md-4">
                  <div className="form-group mb-3 me-0">
                    <Label for="amount">
                      Type<span className="error-text">*</span>
                    </Label>
                    <select
                      className="form-select"
                      {...register('type', {
                        required: 'Type is required',
                      })}
                    >
                      <option value="">Select Type</option>
                      {typeList?.map((type) => (
                        <option value={type?.id} key={type?.id}>
                          {type?.lable}
                        </option>
                      ))}
                    </select>
                    {errors?.type ? (
                      <div className="error-text mt-1">
                        {errors?.type?.message}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3 me-0">
                    <Label for="name">
                      Name<span className="error-text">*</span>
                    </Label>
                    <input
                      type="text"
                      className="form-control "
                      id="name"
                      name="name"
                      {...register('name', {
                        required: 'Name is required',
                      })}
                    />

                    {errors?.name ? (
                      <div className="error-text mt-1">
                        {errors?.name?.message}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3 me-0">
                    <Label for="minAmount">
                      Min Amount<span className="error-text">*</span>
                    </Label>
                    <input
                      type="number"
                      className="form-control "
                      id="minAmount"
                      name="minAmount"
                      {...register('minAmount', {
                        required: 'Min amount is required',
                      })}
                    />

                    {errors?.minAmount ? (
                      <div className="error-text mt-1">
                        {errors?.minAmount?.message}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3 me-0">
                    <Label for="maxAmount">
                      Max Amount<span className="error-text">*</span>
                    </Label>
                    <input
                      type="number"
                      className="form-control "
                      id="maxAmount"
                      name="maxAmount"
                      {...register('maxAmount', {
                        required: 'Max amount is required',
                        min: {
                          value: watch('minAmount'),
                          message: 'Max Amount must be greater than Min Amount',
                        },
                      })}
                    />

                    {errors?.maxAmount ? (
                      <div className="error-text mt-1">
                        {errors?.maxAmount?.message}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3 me-0">
                    <Label for="description">
                      Description<span className="error-text">*</span>
                    </Label>
                    <input
                      type="text"
                      className="form-control "
                      id="description"
                      name="description"
                      {...register('description', {
                        required: 'Description is required',
                      })}
                    />

                    {errors?.description ? (
                      <div className="error-text mt-1">
                        {errors?.description?.message}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3 me-0">
                    <Label for="qrImage">
                      QR Image<span className="error-text">*</span>
                    </Label>
                    <input
                      type="file"
                      className="form-control "
                      id="qrImage"
                      name="qrImage"
                      {...register('qrImage', {
                        required: 'QR image is required',
                      })}
                    />

                    {errors?.qrImage ? (
                      <div className="error-text mt-1">
                        {errors?.qrImage?.message}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                {selectedType === 'cash' ? (
                  <div className="col-md-4">
                    <div className="form-group mb-3 me-0">
                      <Label for="mobileNumber">
                        Mobile Number<span className="error-text">*</span>
                      </Label>
                      <input
                        type="number"
                        className="form-control "
                        id="mobileNumber"
                        name="mobileNumber"
                        {...register('mobileNumber', {
                          required: 'Mobile number is required',
                        })}
                      />

                      {errors?.mobileNumber ? (
                        <div className="error-text mt-1">
                          {errors?.mobileNumber?.message}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                ) : (
                  ''
                )}
                {selectedType === 'bank' ? (
                  <>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="accountHolderName">
                          Account Holder Name
                          <span className="error-text">*</span>
                        </Label>
                        <input
                          type="text"
                          className="form-control "
                          id="accountHolderName"
                          name="accountHolderName"
                          {...register('accountHolderName', {
                            required: 'Account holder name is required',
                          })}
                        />

                        {errors?.accountHolderName ? (
                          <div className="error-text mt-1">
                            {errors?.accountHolderName?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="bankName">
                          Bank Name<span className="error-text">*</span>
                        </Label>
                        <input
                          type="text"
                          className="form-control "
                          id="bankName"
                          name="bankName"
                          {...register('bankName', {
                            required: 'Bank name is required',
                          })}
                        />

                        {errors?.bankName ? (
                          <div className="error-text mt-1">
                            {errors?.bankName?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="accountNumber">
                          Account Number<span className="error-text">*</span>
                        </Label>
                        <input
                          type="number"
                          className="form-control "
                          id="accountNumber"
                          name="accountNumber"
                          {...register('accountNumber', {
                            required: 'Account number is required',
                          })}
                        />

                        {errors?.accountNumber ? (
                          <div className="error-text mt-1">
                            {errors?.accountNumber?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="ifsc">
                          IFSC<span className="error-text">*</span>
                        </Label>
                        <input
                          type="text"
                          className="form-control "
                          id="ifsc"
                          name="ifsc"
                          {...register('ifsc', {
                            required: 'IFSC is required',
                          })}
                        />

                        {errors?.ifsc ? (
                          <div className="error-text mt-1">
                            {errors?.ifsc?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="accountType">
                          Account Type<span className="error-text">*</span>
                        </Label>
                        <select
                          className="form-select"
                          id="accountType"
                          name="accountType"
                          {...register('accountType', {
                            required: 'Account type is required',
                          })}
                        >
                          <option value="">select account type</option>
                          <option value="savings">Saving</option>
                          <option value="current">Current</option>
                        </select>

                        {errors?.accountType ? (
                          <div className="error-text mt-1">
                            {errors?.accountType?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {selectedType === 'platform' ? (
                  <>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="platformName">
                          Platform Name<span className="error-text">*</span>
                        </Label>
                        <input
                          type="text"
                          className="form-control "
                          id="platformName"
                          name="platformName"
                          {...register('platformName', {
                            required: 'Platform name is required',
                          })}
                        />

                        {errors?.platformName ? (
                          <div className="error-text mt-1">
                            {errors?.platformName?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="platformDisplayName">
                          Platform Display Name
                          <span className="error-text">*</span>
                        </Label>
                        <input
                          type="text"
                          className="form-control "
                          id="platformDisplayName"
                          name="platformDisplayName"
                          {...register('platformDisplayName', {
                            required: 'Platform display name is required',
                          })}
                        />

                        {errors?.platformDisplayName ? (
                          <div className="error-text mt-1">
                            {errors?.platformDisplayName?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="platformAddress">
                          Platform Address<span className="error-text">*</span>
                        </Label>
                        <input
                          type="text"
                          className="form-control "
                          id="platformAddress"
                          name="platformAddress"
                          {...register('platformAddress', {
                            required: 'Platform address is required',
                          })}
                        />

                        {errors?.platformAddress ? (
                          <div className="error-text mt-1">
                            {errors?.platformAddress?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  ''
                )}
                {selectedType === 'link' ? (
                  <div className="col-md-4">
                    <div className="form-group mb-3 me-0">
                      <Label for="depositLink">
                        Deposit Link<span className="error-text">*</span>
                      </Label>
                      <input
                        type="text"
                        className="form-control "
                        id="depositLink"
                        name="depositLink"
                        {...register('depositLink', {
                          required: 'Deposit link is required',
                        })}
                      />

                      {errors?.depositLink ? (
                        <div className="error-text mt-1">
                          {errors?.depositLink?.message}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className="form-group text-end">
                <button
                  type="submit"
                  className="btn add-btn me-3"
                  onClick={() => {
                    setIsAddNew(!isAddNew);
                    clearErrors();
                  }}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn custom-buttton py-2"
                  disabled={addLoading}
                >
                  {addLoading && (
                    <span className="spinner-border spinner-border-sm me-2" />
                  )}
                  Add Transfer Type
                </button>
              </div>
            </form>
          ) : (
            <div className="row mt-3">
              <div className="col-md-5">
                <div className="form-group mb-3 me-0">
                  <select
                    className="form-select"
                    onChange={(e) => onChangeTransferType(e.target.value)}
                    name="transferType"
                  >
                    <option value="">Select Transfer Type</option>
                    {!loading
                      ? transactionTypes?.length
                        ? transactionTypes?.map((type) => (
                            <option key={type?._id} value={type?._id}>
                              {type?.name}
                            </option>
                          ))
                        : ''
                      : ''}
                  </select>

                  {withdrawError?.transferType ? (
                    <div className="error-text mt-1">
                      {withdrawError?.transferType}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-group mb-3 me-0">
                  <Label for="amount">
                    Withdrawal Amount<span className="error-text">*</span>
                  </Label>
                  <input
                    type="number"
                    className="form-control "
                    id="amount"
                    name="amount"
                    onChange={(e) => onChangeAmount(e?.target?.value)}
                  />

                  {withdrawError?.amount ? (
                    <div className="error-text mt-1">
                      {withdrawError?.amount}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group mb-3 me-0">
                  <button
                    type="button"
                    className="btn add-btn"
                    onClick={() => setIsAddNew(!isAddNew)}
                  >
                    <img src="/images/icon-plus.svg" alt="plus" />
                    Add
                  </button>
                </div>
              </div>
              <div className="row m-0 center-align mt-2">
                <div className="withdraw-amount">
                  You can withdraw upto{' '}
                  <strong className="text-secondary">
                    {' '}
                    {(
                      userDetails.user.balance - userDetails.user.exposure
                    ).toFixed(2)}
                  </strong>{' '}
                  minimum
                  <strong className="text-secondary">100</strong> is required
                </div>
              </div>
              <div className="form-group text-end">
                <button
                  type="button"
                  className="btn custom-buttton py-2"
                  disabled={loading}
                  onClick={onSendWithdrawlaRequest}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm me-2" />
                  )}
                  Withdraw Request{' '}
                  {Object.values(withdrawError).every(
                    (value) => typeof value === 'string' && value.trim() === '',
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WithdrawPageContent;
