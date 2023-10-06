import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, Table } from 'reactstrap';

function NotificationPopup({ isOpen, closeModal }) {
  return (
    <Modal
      isOpen={isOpen}
      toggle={closeModal}
      className="bet-table-popup"
      backdrop="static"
    >
      <div className="modal-header">
        <h6 className="mb-0"> South Africa Women v New Zealand Women</h6>
        <button
          type="button"
          aria-label="Close"
          className="close-bet"
          onClick={closeModal}
        >
          <img src="./images/close.svg" alt="close" className="w-50 h-50" />
        </button>
      </div>
      <ModalBody>
        <div className="betting-dashboard">
          <div className="tabing-sec rounded">
            <div className="tab-content">
              <div
                role="tabpanel"
                className="tab-pane fade in active"
                id="games"
              >
                <Table responsive bordered className="mb-0">
                  <thead>
                    <tr>
                      <th className="text-primary">Market Name</th>
                      <th className="text-primary">P/L</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="notification-detail">Match Odds</td>
                      <td className="notification-detail">
                        <span className="text-success">31.31</span>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="text-end">Win :</td>
                      <td className="text-start">
                        <div className="d-flex align-items-center justify-content-between">
                          <span className="text-success">31.31</span>
                          <Link to="/" className="btn custom-buttton py-1">
                            View Bet
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default NotificationPopup;
