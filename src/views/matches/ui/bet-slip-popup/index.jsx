import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap';

const BetSlipPopup = ({ isOpen, toggle }) => {
  const [betAmount, setBetAmount] = useState('');
  const data = useSelector((state) => state.data.payload);

  const ammountArray = [1, 2, 5, 10, 20, 25, 50, 75, 90, 95];
  const onClickAmmount = (amount) => {
    setBetAmount(`${amount}000`);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="bet-table-popup">
      <div className="modal-header">
        <h5 className="modal-title">Bet Slip</h5>
        <button
          type="button"
          aria-label="Close"
          className="close-bet"
          onClick={toggle}
        >
          <img src="./images/close.svg" alt="close" className="w-75 h-75" />
        </button>
      </div>
      <ModalBody>
        <div className="betting-dashboard">
          <div className="dashboard-data">
            <div className="buttonset">
              <div className="bet-amount-block">
                <div className="bet-amount-disc">
                  <div className="betting-user-disc">
                    <div className="name">MATCH_ODDS</div>
                    <div className="disc">{data?.eventName || ''}</div>
                  </div>
                  <div className="points">
                    <div className="category">{data?.runner || ''}</div>
                    <div className="selection">
                      <form action="">
                        <p className="qty">
                          <input
                            type="number"
                            name="qty"
                            id="qty"
                            step="1"
                            defaultValue={data?.price || 0}
                          />
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  placeholder="Amount"
                  className="type-aminunt form-control"
                  defaultValue={betAmount}
                />
                <div className="amount-choose">
                  {ammountArray?.map((amount) => (
                    <button
                      type="button"
                      className="amounts"
                      key={amount}
                      onClick={() => {
                        onClickAmmount(amount);
                      }}
                    >
                      {amount}k
                    </button>
                  ))}
                </div>
              </div>
              <button className="custom-buttton" type="button">
                Place bet
              </button>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default BetSlipPopup;
