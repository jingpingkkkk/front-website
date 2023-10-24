/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import './bet-panel.css';
import { Modal, ModalBody } from 'reactstrap';
import { roundNumber, shortNumber } from '../../../../helper/number';
import { MARKET_NAMES } from '../../helpers/constants';

function MyBetsMobile({ isOpen, toggle, betMarkets }) {
  const [activeTab, setActiveTab] = useState('');
  const [myBets, setMyBets] = useState([]);
  const onClickMarket = (e, marketName) => {
    e.preventDefault();
    setActiveTab(marketName);
    const bets = betMarkets?.find((b) => b.marketName === marketName);
    setMyBets(bets?.bets || []);
  };
  useEffect(() => {
    const marketName = betMarkets[0]?.marketName;
    setActiveTab(marketName);
    const bets = betMarkets?.find((b) => b.marketName === marketName);
    setMyBets(bets?.bets || []);
  }, [betMarkets]);
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="bet-table-popup">
      <div className="modal-header">
        <h5 className="modal-title">MY BETS</h5>
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
        <div className="my-market-container">
          <div className="market-tabs">
            <ul className="nav nav-tabs">
              {betMarkets.map((bm) => (
                <li className="nav-item" key={bm.marketId}>
                  <a
                    href="#"
                    data-toggle="tab"
                    className={`nav-link ${
                      activeTab === bm.marketName ? 'active' : ''
                    }`}
                    onClick={(e) => onClickMarket(e, bm.marketName)}
                  >
                    <span>
                      {bm.marketName}
                      <span className="ms-1">({bm?.bets?.length || 0})</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="bet-slip-box tab-content">
            <div id="sodatab0" className="tab-pane active">
              {myBets?.map((bet) => (
                <div
                  className={`bet-slip ${
                    bet.isBack ? 'back-left-border' : 'lay-left-border'
                  }`}
                  key={bet?._id}
                >
                  <div className="row row2 market-desc">
                    <div className="col-6 text-left">
                      <div className="my-market-nation">{bet?.runnerName}</div>
                    </div>
                    <div className="col-2 text-center">
                      <div>
                        {activeTab === MARKET_NAMES.NORMAL
                          ? `${bet?.runnerScore}/`
                          : ''}
                        {roundNumber(bet.odds)}
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div>{shortNumber(bet.stake)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default MyBetsMobile;
