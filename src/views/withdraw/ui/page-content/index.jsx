import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from 'reactstrap';
import { postRequest } from '../../../../api';
import ToastAlert from '../../../../helper/toast-alert';
import { userLogout } from '../../../../helper/user';
import { resetUserDetails } from '../../../../redux/reducers/user-details';
import './withdraw.css';

function WithdrawPageContent() {
  const userDetails = useSelector((state) => state.userDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
            <span className="text-success">119.32</span>
          </div>
          <div className="row mt-3">
            <form id="passwordForm" onSubmit={handleSubmit(onSubmit)}>
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
              <div className="row m-0 center-align mt-2">
                <div className="withdraw-amount">
                  You can withdraw upto{' '}
                  <strong className="text-secondary">119.32,</strong> minimum
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawPageContent;
