/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, ModalBody, Spinner, Table } from 'reactstrap';
import { postRequest } from '../../../../api';
import { roundNumber } from '../../../../helper/number';

const ExposureDetail = ({ isOpen, toggle }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserExposureList = async () => {
      setLoading(true);
      const body = {
        loginUserId: userDetails?.user?._id,
      };
      const result = await postRequest('bet/getUserExposureList', body);
      if (result?.success) {
        setData(result?.data?.details || []);
      }
      setLoading(false);
    };

    fetchUserExposureList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="bet-table-popup"
      size="lg"
    >
      <div className="modal-header">
        <h5 className="modal-title">Exposure Details</h5>
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
          className="mb-0 table bet-detail-tab p-2"
        >
          <thead>
            <tr>
              <th className="text-primary p-2 w-75">Events Name</th>
              <th className="text-primary text-start p-2 w-25">Exposure</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2}>
                  <Spinner />
                </td>
              </tr>
            ) : data?.length ? (
              data?.map((exposure) => (
                <tr key={`${exposure?.index}-${exposure?.eventId}`}>
                  <td className="text-start p-2">
                    {exposure?.eventName || ''}
                  </td>
                  <td className="p-2 text-start">
                    <span className="text-danger">
                      {roundNumber(exposure?.exposure) || 0}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No Data</td>
              </tr>
            )}
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default ExposureDetail;
