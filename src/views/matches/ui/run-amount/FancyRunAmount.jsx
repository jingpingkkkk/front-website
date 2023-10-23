/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import { postRequest } from '../../../../api';

const FancyRunAmount = ({ isOpen, toggle, marketRunner }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRunAmount = async () => {
    setLoading(true);
    const body = {
      loginUserId: userDetails?.user?._id,
      marketRunnerId: marketRunner,
    };
    const result = await postRequest('bet/getRunAmount', body);
    if (result?.success) {
      setData(result?.data?.details || []);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchRunAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="bet-table-popup bet-amount-popup"
    >
      <div className="modal-header">
        <h5 className="modal-title">Run Amount</h5>
        <button
          type="button"
          aria-label="Close"
          className="close-bet"
          onClick={toggle}
        >
          <img src="./images/close.svg" alt="close" className="w-50 h-50" />
        </button>
      </div>
      <ModalBody>
        <Table
          responsive
          bordered
          dark
          className="mb-0 table bet-detail-tab text-center"
        >
          <thead>
            <tr>
              <th className="text-primary" style={{ width: '100px' }}>
                Run
              </th>
              <th className="text-primary" style={{ width: '100px' }}>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && data?.length
              ? data?.map((run) => (
                  <tr key={run?.run}>
                    <td>{run?.run}</td>
                    <td>
                      <span
                        className={`${
                          run?.amount > 0 ? 'text-success' : 'text-danger'
                        }`}
                      >
                        {run?.amount}
                      </span>
                    </td>
                  </tr>
                ))
              : ''}
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default FancyRunAmount;
