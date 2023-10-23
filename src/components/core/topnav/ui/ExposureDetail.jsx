/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Modal, ModalBody, Table } from 'reactstrap';

const ExposureDetail = ({ isOpen, toggle }) => {
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
              <th className="text-primary p-2">Events Name</th>
              <th className="text-primary text-center p-2">Exposure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-start p-2">
                Hobart Hurricanes WBBL V Perth Scorchers WBBL
              </td>
              <td className="p-2">
                <span className="text-danger">1100</span>
              </td>
            </tr>
            <tr>
              <td className="text-start p-2">Australia V Pakistan</td>
              <td className="p-2">
                <span className="text-danger">1100</span>
              </td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default ExposureDetail;
