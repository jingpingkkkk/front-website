import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from 'reactstrap';
import { postRequest } from '../../../../api';
import ToastAlert from '../../../../helper/toast-alert';
import { userLogout } from '../../../../helper/user';
import { resetUserDetails } from '../../../../redux/reducers/user-details';

function ChangePasswordPageContent() {
  const userDetails = useSelector((state) => state.userDetails);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const password = watch('newPassword');

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
          <div className="report-name">Change Password</div>
        </div>
        <div className="tab-content">
          <div className="row justify-content-center">
            <div className="col-sm-6">
              <form id="passwordForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3 me-0">
                  <Label for="oldPassword">Old Password</Label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    name="oldPassword"
                    {...register('oldPassword', {
                      required: 'Old Password is required',
                    })}
                  />
                  {errors?.oldPassword ? (
                    <div className="text-danger mt-1">
                      {errors?.oldPassword?.message}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-group mb-3 me-0">
                  <Label for="inputPasswordNew">New Password</Label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    {...register('newPassword', {
                      required: 'New Password is required',
                    })}
                  />
                  {errors?.newPassword ? (
                    <div className="text-danger mt-1">
                      {errors?.newPassword?.message}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-group mb-3 me-0">
                  <Label for="inputPasswordNewVerify">Confirm Password</Label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPwd"
                    name="confirmPwd"
                    {...register('confirmPwd', {
                      required: 'Confirm Password is required',
                      validate: (value) =>
                        value === password || 'The passwords does not match',
                    })}
                  />
                  {errors?.confirmPwd ? (
                    <div className="text-danger mt-1">
                      {errors?.confirmPwd?.message}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="btn custom-buttton py-2"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm me-2" />
                    )}
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPageContent;
