/* eslint-disable react/jsx-curly-brace-presence */
import moment from 'moment';
import React from 'react';
import { Modal, ModalBody, Table } from 'reactstrap';

const BetDetail = ({ isOpen, toggle, selectedBet }) => {
  const netBetTotal = selectedBet.betPl + 0;

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="bet-table-popup"
      size="lg"
    >
      <div className="modal-header">
        <h5 className="modal-title">{selectedBet?.eventName || ''}</h5>
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
                Bet Id
              </th>
              <th className="text-primary" style={{ width: '100px' }}>
                Selection
              </th>
              <th className="text-primary" style={{ width: '100px' }}>
                Odds
              </th>
              <th className="text-primary" style={{ width: '100px' }}>
                Stake
              </th>
              <th className="text-primary" style={{ width: '100px' }}>
                Type
              </th>
              <th className="text-primary" style={{ width: '100px' }}>
                Placed
              </th>
              <th className="text-primary" style={{ width: '100px' }}>
                Profit/Loss
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ wordWrap: 'break-word' }}>{selectedBet?._id}</td>
              <td>{selectedBet?.runnerName || ''}</td>
              <td>{selectedBet?.odds}</td>
              <td>{selectedBet?.stake}</td>
              <td>{selectedBet?.isBack ? 'Back' : 'Lay'}</td>
              <td>
                {selectedBet?.createdAt
                  ? moment(selectedBet?.createdAt).format('DD/MM/YYYY H:mm:s')
                  : ''}
              </td>
              <td>
                <span
                  className={`${
                    selectedBet?.betPl > 0 ? 'text-success' : 'text-danger'
                  }`}
                >
                  {selectedBet?.betPl}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>

        <div className="row m-3 bet-net-total-row">
          <div className="col-md-1" />
          <div className="col-md-2 p-1 ps-3 text-center">
            <div style={{ color: '#72bbef' }}>Back SubTotal</div>
            <div
              className={`text-center ${
                selectedBet?.betPl > 0 ? 'text-success' : 'text-danger'
              }`}
            >
              {selectedBet?.isBack ? selectedBet?.betPl : 0}
            </div>
          </div>
          <div className="col-md-1 mt-2 text-center p-1">
            <span>+</span>
          </div>
          <div className="col-md-2 p-1 text-center">
            <div className="text-danger">Lay SubTotal</div>
            <div
              className={`text-center ${
                selectedBet?.betPl > 0 ? 'text-success' : 'text-danger'
              }`}
            >
              {selectedBet?.isBack ? 0 : selectedBet?.betPl}
            </div>
          </div>

          <div className="col-md-1 mt-2 text-center">
            <span>=</span>
          </div>
          <div className="col-md-3 text-center">
            <div>Net Market Subtotal</div>
            <div
              className={`text-center ${
                netBetTotal > 0 ? 'text-success' : 'text-danger'
              }`}
            >
              {netBetTotal}
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default BetDetail;
