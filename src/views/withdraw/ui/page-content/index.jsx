/* eslint-disable no-nested-ternary */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from 'reactstrap';
import DataTable from 'react-data-table-component';
import { handleFormData, postRequest } from '../../../../api';
import ToastAlert from '../../../../helper/toast-alert';
import './withdraw.css';
import { setUserDetails } from '../../../../redux/reducers/user-details';

const typeList = [
  { id: 'cash', lable: 'Cash' },
  { id: 'bank', lable: 'Bank' },
  { id: 'platform', lable: 'Platform' },
  { id: 'link', lable: 'Link' },
];

function WithdrawPageContent() {
  const userDetails = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const [isAddNew, setIsAddNew] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    clearErrors,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const [transferType, setTransferType] = useState('');
  const [amount, setAmount] = useState('');
  const [withdrawError, setWithdrawError] = useState({
    amount: 'Amount is required',
    transferType: 'Transfer type is required',
  });
  const [isValid, setIsValid] = useState(false);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const selectedType = watch('type');
  const rehydrateUser = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) return null;
    const result = await postRequest('users/rehydrateUser');
    if (result.success) {
      dispatch(setUserDetails(result.data.details));
      return result.data.details;
    }
    return null;
  };

  const fetchTransactionTypeList = async () => {
    setLoading(true);
    let user = userDetails?.user;
    if (!userDetails?.user?._id) {
      user = await rehydrateUser();
    }
    const body = {
      parentUserId: user?.masterUserId,
      transferType: 'withdrawal',
      userId: user?._id,
    };
    const result = await postRequest('exchangeHome/getTransferType', body);
    if (result?.success) {
      setTransactionTypes(result?.data?.records || []);
    }
    setLoading(false);
  };

  const fetchWithdrawlRequestsList = async () => {
    setLoading(true);
    let user = userDetails?.user;
    if (!userDetails?.user?._id) {
      user = await rehydrateUser();
    }
    const body = {
      page: currentPage,
      perPage: rowsPerPage,
      sortBy: 'createdAt',
      requestUserId: user?._id,
      direction: 'desc',
    };
    const result = await postRequest(
      'transferRequest/getAllTransferRequest',
      body,
    );
    if (result?.success) {
      setItems(result?.data?.records || []);
      setTotalPages(result?.data?.totalRecords);
    }
    setLoading(false);
  };

  const columns = [
    {
      name: 'SR.',
      selector: (row, index) => (currentPage - 1) * rowsPerPage + (index + 1),
      sortable: false,
      width: '80px',
    },
    {
      name: 'TRANSFER TYPE',
      selector: (row) => [row.transferTypeName],
      sortable: false,
      sortField: 'transferTypeName',
      width: '300px',
    },
    {
      name: 'TRANSFER NAME',
      selector: (row) => [row.transferType?.name],
      sortable: false,
      sortField: 'transferName',
      width: '300px',
    },
    {
      name: 'AMOUNT',
      selector: (row) => [row.amount],
      sortable: false,
      sortField: 'amount',
    },
    {
      name: 'STATUS',
      selector: (row) => [row.status],
      sortable: false,
      sortField: 'status',
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleRowsPerPageChange = (newPerPage) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(1);
  };

  const onSubmit = async (data) => {
    setAddLoading(true);
    try {
      const formData = new FormData(); // Create a new FormData object
      formData.append('userId', userDetails?.user?._id);
      formData.append('parentUserId', userDetails?.user?.masterUserId);
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
        fetchTransactionTypeList();
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

  const onChangeAmount = async (value) => {
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

  const onChangeTransferType = async (transType) => {
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
    await onChangeTransferType(transferType);
    await onChangeAmount(amount);
  };

  const onSendWithdrawlaRequest = async () => {
    await onCheckVaidation();

    if (isValid) {
      setAddLoading(true);
      try {
        const data = {
          userId: userDetails?.user?._id,
          transferTypeId: transferType,
          amount,
          parentUserId: userDetails?.user?.masterUserId,
        };
        const result = await handleFormData(
          'transferRequest/createTransferRequest',
          data,
        );
        if (result?.success) {
          ToastAlert.success('Withdrawal request send Successfully');
          setAmount(null);
          setTransferType('');
          fetchWithdrawlRequestsList();
          setAddLoading(false);
        } else {
          setAddLoading(false);
          ToastAlert.error(result?.message);
        }
      } catch (err) {
        setAddLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWithdrawlRequestsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentPage]);

  useEffect(() => {
    fetchTransactionTypeList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isvalidate = !Object.values(withdrawError).some(
      (item) => item !== null && item !== '',
    );
    setIsValid(isvalidate);
  }, [withdrawError]);

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
                        <select
                          className="form-select"
                          id="platformName"
                          name="platformName"
                          {...register('platformName', {
                            required: 'Account type is required',
                          })}
                        >
                          <option value="upi">UPI </option>
                          <option value="gpay">GPAY </option>
                          <option value="phonepe">PHONEPE </option>
                          <option value="paytm">PAYTM </option>
                        </select>

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
                    value={transferType}
                  >
                    <option value="">Select Transfer Name</option>
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
                    value={amount}
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
                  disabled={addLoading}
                  onClick={onSendWithdrawlaRequest}
                >
                  {addLoading && (
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

          <div className="report-table table-responsive">
            {items.length > 0 ? (
              <DataTable
                columns={columns}
                data={items}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalPages}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={(value) => handleRowsPerPageChange(value)}
                paginationPerPage={rowsPerPage}
                // customStyles={customStyles}
              />
            ) : (
              <table className="table mt-2 border-0">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.name}
                        style={{
                          color: '#1A1A1A',
                          fontSize: '12px',
                          height: '52px',
                          verticalAlign: 'middle',
                          backgroundColor: '#fff',
                        }}
                      >
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      colSpan={columns.length}
                      style={{
                        backgroundColor: '#fff',
                        color: '#1A1A1A',
                        fontSize: '14px',
                        height: '52px',
                        verticalAlign: 'middle',
                      }}
                    >
                      No records found
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawPageContent;
