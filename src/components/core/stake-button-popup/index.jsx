/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, Table } from 'reactstrap';
import '../../../views/matches/ui/page-content/matches.css';
import { useForm } from 'react-hook-form';
import { postRequest } from '../../../api';

const StateButtons = ({ isOpen, closeModal }) => {
  const {
    handleSubmit,
    setValue,
    register,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [activeTab, setActiveTab] = useState('games');
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [stakeId, setStakeId] = useState('');
  const [userId, setUserId] = useState('');
  const maxInputs = 10;

  const getStakeById = async () => {
    try {
      clearErrors();
      const item = JSON.parse(localStorage.getItem('user'));
      setUserId(item?._id);
      const data = {
        user_id: item?._id,
        stakeType: activeTab,
      };
      setLoading(true);
      const result = await postRequest('stake/getStakeById', data);
      if (result?.success) {
        setLoading(false);
        const newInputValues = result?.data?.details?.inputValues?.slice();
        while (newInputValues.length < maxInputs) {
          newInputValues.push('');
        }
        setInputValues(newInputValues);
        setValue(`${activeTab}.inputValues`, newInputValues);
        if (result?.data?.details?._id) {
          setStakeId(result?.data?.details?._id);
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const url = stakeId ? 'stake/updateStake' : 'stake/createStake';
    const formData = {
      stakeType: activeTab,
      userId,
      ...data[activeTab],
    };
    if (stakeId) {
      formData._id = stakeId;
    }
    try {
      setAddLoading(true);
      const result = await postRequest(url, formData);
      if (result?.success) {
        setAddLoading(false);
        closeModal();
      }
    } catch (error) {
      setAddLoading(false);
    }
  };

  useEffect(() => {
    getStakeById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);
  return (
    <Modal
      isOpen={isOpen}
      toggle={closeModal}
      className="bet-table-popup"
      backdrop="static"
    >
      <div className="modal-header">
        <h5 className="mb-0">Set Button Value</h5>
        <button
          type="button"
          aria-label="Close"
          className="close-bet"
          onClick={closeModal}
        >
          <img src="./images/close.svg" alt="close" className="w-75 h-75" />
        </button>
      </div>
      <ModalBody>
        <div className="betting-dashboard">
          <div className="tabing-sec rounded">
            <ul className="nav nav-tabs rounded" role="tablist">
              <li className="nav-item">
                <a
                  className={
                    activeTab === 'games' ? 'nav-link active' : 'nav-link'
                  }
                  href="#"
                  role="tab"
                  onClick={() => setActiveTab('games')}
                >
                  Game Buttons
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={
                    activeTab === 'casino' ? 'nav-link active' : 'nav-link'
                  }
                  href="#"
                  role="tab"
                  onClick={() => setActiveTab('casino')}
                >
                  Casino Buttons
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                role="tabpanel"
                className="tab-pane fade in active"
                id="games"
              >
                <Table responsive bordered dark className="mb-0">
                  <thead>
                    <tr>
                      <th>Price Label</th>
                      <th>Price Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading &&
                      inputValues?.map((stake, index) => (
                        <tr key={stake?.priceLabel}>
                          <td>
                            <input
                              type="text"
                              className="form-control bg-transparent text-white"
                              {...register(
                                `${activeTab}.inputValues.${index}.priceLabel`,
                                {
                                  required: `The Price Label ${
                                    index + 1
                                  } field is required`,
                                },
                              )}
                            />
                            {errors[activeTab]?.inputValues?.[index]
                              ?.priceLabel ? (
                              <div className="text-danger small mt-1">
                                {
                                  errors?.[activeTab]?.inputValues?.[index]
                                    ?.priceLabel?.message
                                }
                              </div>
                            ) : (
                              ''
                            )}
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control bg-transparent text-white"
                              {...register(
                                `${activeTab}.inputValues.${index}.priceValue`,
                                {
                                  required: `The Price Value ${
                                    index + 1
                                  } field is required`,
                                },
                              )}
                            />
                            {errors[activeTab]?.inputValues?.[index]
                              ?.priceValue ? (
                              <div className="text-danger small mt-1">
                                {
                                  errors[activeTab]?.inputValues?.[index]
                                    ?.priceValue?.message
                                }
                              </div>
                            ) : (
                              ''
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                {!loading && inputValues?.length ? (
                  <button
                    type="button"
                    className="btn custom-buttton mt-2"
                    onClick={handleSubmit(onSubmit)}
                    disabled={addLoading}
                  >
                    {addLoading && (
                      <span className="spinner-border spinner-border-sm me-2" />
                    )}
                    Submit
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default StateButtons;
