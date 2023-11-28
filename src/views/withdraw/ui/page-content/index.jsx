import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from 'reactstrap';
import { postRequest } from '../../../../api';
import ToastAlert from '../../../../helper/toast-alert';
import { userLogout } from '../../../../helper/user';
import { resetUserDetails } from '../../../../redux/reducers/user-details';
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
  } = useForm();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const selectedType = watch('type');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (userDetails?.user) {
        data.loginUserId = userDetails?.user?._id;
      }
      delete data.confirmPwd;
      const result = await postRequest('users/changePassword', data);
      if (result?.success) {
        setLoading(false);
        dispatch(resetUserDetails());
        userLogout();
      } else {
        setLoading(false);
        ToastAlert.error(result?.message);
      }
    } catch (err) {
      setLoading(false);
    }
  };

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
                      Type<span className="text-danger">*</span>
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
                      <div className="text-danger mt-1">
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
                      Name<span>*</span>
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
                      <div className="text-danger mt-1">
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
                      Min Amount<span>*</span>
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
                      <div className="text-danger mt-1">
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
                      Max Amount<span>*</span>
                    </Label>
                    <input
                      type="number"
                      className="form-control "
                      id="maxAmount"
                      name="maxAmount"
                      {...register('maxAmount', {
                        required: 'Max amount is required',
                      })}
                    />

                    {errors?.maxAmount ? (
                      <div className="text-danger mt-1">
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
                      Description<span>*</span>
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
                      <div className="text-danger mt-1">
                        {errors?.description?.message}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3 me-0">
                    <Label for="amount">
                      QR Image<span>*</span>
                    </Label>
                    <input
                      type="file"
                      className="form-control "
                      id="amount"
                      name="amount"
                      {...register('amount', {
                        required: 'Withdrawal amount is required',
                      })}
                    />

                    {errors?.amount ? (
                      <div className="text-danger mt-1">
                        {errors?.amount?.message}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                {selectedType === 'cash' ? (
                  <div className="col-md-4">
                    <div className="form-group mb-3 me-0">
                      <Label for="amount">
                        Mobile Number<span>*</span>
                      </Label>
                      <input
                        type="number"
                        className="form-control "
                        id="amount"
                        name="amount"
                        {...register('amount', {
                          required: 'Withdrawal amount is required',
                        })}
                      />

                      {errors?.amount ? (
                        <div className="text-danger mt-1">
                          {errors?.amount?.message}
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
                        <Label for="amount">
                          Account Holder Name<span>*</span>
                        </Label>
                        <input
                          type="number"
                          className="form-control "
                          id="amount"
                          name="amount"
                          {...register('amount', {
                            required: 'Withdrawal amount is required',
                          })}
                        />

                        {errors?.amount ? (
                          <div className="text-danger mt-1">
                            {errors?.amount?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="amount">
                          Bank Name<span>*</span>
                        </Label>
                        <input
                          type="number"
                          className="form-control "
                          id="amount"
                          name="amount"
                          {...register('amount', {
                            required: 'Withdrawal amount is required',
                          })}
                        />

                        {errors?.amount ? (
                          <div className="text-danger mt-1">
                            {errors?.amount?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="amount">
                          Account Number<span>*</span>
                        </Label>
                        <input
                          type="number"
                          className="form-control "
                          id="amount"
                          name="amount"
                          {...register('amount', {
                            required: 'Withdrawal amount is required',
                          })}
                        />

                        {errors?.amount ? (
                          <div className="text-danger mt-1">
                            {errors?.amount?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="amount">
                          IFSC<span>*</span>
                        </Label>
                        <input
                          type="number"
                          className="form-control "
                          id="amount"
                          name="amount"
                          {...register('amount', {
                            required: 'Withdrawal amount is required',
                          })}
                        />

                        {errors?.amount ? (
                          <div className="text-danger mt-1">
                            {errors?.amount?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="amount">
                          Account Type<span>*</span>
                        </Label>
                        <input
                          type="number"
                          className="form-control "
                          id="amount"
                          name="amount"
                          {...register('amount', {
                            required: 'Withdrawal amount is required',
                          })}
                        />

                        {errors?.amount ? (
                          <div className="text-danger mt-1">
                            {errors?.amount?.message}
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
                        <Label for="amount">
                          Platform Name<span>*</span>
                        </Label>
                        <input
                          type="number"
                          className="form-control "
                          id="amount"
                          name="amount"
                          {...register('amount', {
                            required: 'Withdrawal amount is required',
                          })}
                        />

                        {errors?.amount ? (
                          <div className="text-danger mt-1">
                            {errors?.amount?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="amount">
                          Platform Display Name<span>*</span>
                        </Label>
                        <input
                          type="number"
                          className="form-control "
                          id="amount"
                          name="amount"
                          {...register('amount', {
                            required: 'Withdrawal amount is required',
                          })}
                        />

                        {errors?.amount ? (
                          <div className="text-danger mt-1">
                            {errors?.amount?.message}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group mb-3 me-0">
                        <Label for="amount">
                          Platform Address<span>*</span>
                        </Label>
                        <input
                          type="number"
                          className="form-control "
                          id="amount"
                          name="amount"
                          {...register('amount', {
                            required: 'Withdrawal amount is required',
                          })}
                        />

                        {errors?.amount ? (
                          <div className="text-danger mt-1">
                            {errors?.amount?.message}
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
                      <Label for="amount">
                        Deposit Link<span>*</span>
                      </Label>
                      <input
                        type="number"
                        className="form-control "
                        id="amount"
                        name="amount"
                        {...register('amount', {
                          required: 'Withdrawal amount is required',
                        })}
                      />

                      {errors?.amount ? (
                        <div className="text-danger mt-1">
                          {errors?.amount?.message}
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
                  onClick={() => setIsAddNew(!isAddNew)}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn custom-buttton py-2"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm me-2" />
                  )}
                  Withdraw Request
                </button>
              </div>
            </form>
          ) : (
            <div className="row mt-3">
              <div className="col-md-5">
                <div className="form-group mb-3 me-0">
                  <select className="form-select">
                    <option>Select Transfer Type</option>
                    <option>Cash</option>
                    <option>Bank</option>
                  </select>
                </div>
                <div className="form-group mb-3 me-0">
                  <Label for="amount">
                    Withdrawal Amount<span>*</span>
                  </Label>
                  <input
                    type="number"
                    className="form-control "
                    id="amount"
                    name="amount"
                    {...register('amount', {
                      required: 'Withdrawal amount is required',
                    })}
                  />

                  {errors?.amount ? (
                    <div className="text-danger mt-1">
                      {errors?.amount?.message}
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
                  type="submit"
                  className="btn custom-buttton py-2"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm me-2" />
                  )}
                  Withdraw Request
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
