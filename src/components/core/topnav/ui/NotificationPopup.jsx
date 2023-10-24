/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, Spinner, Table } from 'reactstrap';
import { postRequest } from '../../../../api';
import { roundNumber } from '../../../../helper/number';

function NotificationPopup({ isOpen, closeModal, eventId, eventName }) {
  const userDetails = useSelector((state) => state.userDetails);
  const [notificationDetails, setNotificationDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getNotificationDetail = async () => {
      setLoading(true);
      const body = {
        loginUserId: userDetails?.user?._id,
        eventId,
      };
      const result = await postRequest('bet/getCompleteBetEventWise', body);
      if (result?.success) {
        setNotificationDetails(result?.data?.details || []);
      }
      setLoading(false);
    };

    getNotificationDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countWinLoss = () => {
    const pl = notificationDetails?.map((notification) => notification?.pl);
    return pl.reduce((acc, currentValue) => acc + currentValue, 0);
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={closeModal}
        className="bet-table-popup"
        backdrop="static"
      >
        <div className="modal-header">
          <h6 className="mb-0"> {eventName}</h6>
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
                        <th className="text-secondary">Market Name</th>
                        <th className="text-secondary text-end">P/L</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={2}>
                            <Spinner />
                          </td>
                        </tr>
                      ) : notificationDetails?.length ? (
                        notificationDetails?.map((detail) => (
                          <tr key={detail?._id}>
                            <td className="notification-detail text-primary">
                              {detail?.marketName || ''}
                            </td>
                            <td
                              className="notification-detail"
                              style={{ textAlign: 'right !important' }}
                            >
                              <span
                                className={` ${
                                  detail?.pl > 0
                                    ? 'text-success'
                                    : 'text-danger'
                                }`}
                              >
                                {roundNumber(detail?.pl)}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : null}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="text-end">
                          {countWinLoss() > 0 ? 'Win' : 'Loss'} :
                        </td>
                        <td className="text-start">
                          <div className="d-flex align-items-center justify-content-between">
                            <span
                              className={` ${
                                countWinLoss() > 0
                                  ? 'text-success'
                                  : 'text-danger'
                              }`}
                            >
                              {roundNumber(countWinLoss())}
                            </span>
                            <Link
                              to="/currentbets"
                              className="btn custom-buttton py-1"
                            >
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
      {countWinLoss() > 0 ? (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default NotificationPopup;
