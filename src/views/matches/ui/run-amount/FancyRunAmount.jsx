/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Modal, ModalBody, Table } from 'reactstrap';

const FancyRunAmount = ({ isOpen, toggle }) => {
  const amount = 100;
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="bet-table-popup">
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
            <tr>
              <td>287</td>
              <td>
                <span
                  className={`${amount > 0 ? 'text-success' : 'text-danger'}`}
                >
                  {amount}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default FancyRunAmount;
