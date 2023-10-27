/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap';
import useRunnerPl from '../../hooks/use-runner-pl';
import defaultStakeButtons from '../../../../helper/stake-buttons';
import {
  betTypes,
  resetEventBet,
  setAbsoluteBetProfit,
  setBetPrice,
  setBetSize,
  setBetStake,
} from '../../../../redux/reducers/event-bet';
import {
  setMarketPlForecast,
  setMarketRunnerPls,
} from '../../../../redux/reducers/event-market';
import { postRequest } from '../../../../api';
import ToastAlert from '../../../../helper/toast-alert';
import { roundNumber, shortNumber } from '../../../../helper/number';
import LoadingRelative from '../../../../components/common/loading-relative';
import { MARKET_NAMES } from '../../helpers/constants';

const BetSlipPopup = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const eventBet = useSelector((state) => state.eventBet);
  const eventMarket = useSelector((state) => state.eventMarket);
  const userDetails = useSelector((state) => state.userDetails);
  const { calculateRunnerPl, calculateAbsolutePl } = useRunnerPl();

  const stakeButtons =
    userDetails?.gameButtons?.inputValues || defaultStakeButtons;

  const [betLoading, setBetLoading] = useState(false);
  const [runners, setRunners] = useState([]);

  const updateStake = ({ stake = null, price = null, max = false }) => {
    const { market, betType, size, price: odds } = eventBet;

    if (price === null) {
      price = odds;
    }

    if (max) {
      const losingCapacity =
        userDetails.user.balance - userDetails.user.exposure;
      if (betType === betTypes.BACK) {
        stake = losingCapacity;
      } else {
        stake = Math.floor(losingCapacity / (price - 1));
      }
    }

    const runnerPls = calculateRunnerPl({ stake, market });
    const { pl } = calculateAbsolutePl({
      stake,
      market,
      size: eventBet.size,
    });

    dispatch(setMarketRunnerPls({ marketId: market._id, runnerPls }));
    dispatch(setAbsoluteBetProfit(pl));
    dispatch(setBetStake(stake));
    dispatch(setBetPrice(price));
    dispatch(setBetSize(size));
  };

  const placeBet = async () => {
    try {
      setBetLoading(true);

      // const ipAddress = await ipDetails();

      const body = {
        marketId: eventBet.market._id,
        apiMarketId: eventBet.market.apiMarketId,
        runnerId: eventBet.runner._id,
        runnerSelectionId: eventBet.runner.selectionId,
        eventId: eventMarket.event.eventId,
        odds: eventBet.price,
        stake: eventBet.stake,
        isBack: eventBet.betType === betTypes.BACK,
        betOrderType: eventBet.orderType,
        deviceInfo: navigator.userAgent,
        // ipAddress: ipAddress.ip,
        ipAddress: '0.0.0.0',
      };

      if (eventBet?.market?.name === 'Normal') {
        body.odds = eventBet.size;
        body.price = eventBet.size;
        body.runnerScore = eventBet.price;
      }

      const result = await postRequest('bet/createBet', body);
      if (!result.success) {
        throw new Error(result.message);
      }

      dispatch(
        setMarketRunnerPls({ marketId: eventBet.market._id, runnerPls: {} }),
      );
      dispatch(setAbsoluteBetProfit(0));

      setTimeout(() => {
        dispatch(resetEventBet());
        ToastAlert.success('Bet placed successfully.');
        setBetLoading(false);
      }, eventBet.market.betDelay * 1000);
    } catch (e) {
      setBetLoading(false);
    }
  };

  const placeBetOnEnter = (e) => {
    if (e.key === 'Enter') {
      placeBet();
    }
  };

  useEffect(() => {
    const runers = eventMarket?.markets?.find(
      (mrk) => mrk._id === eventBet?.market?._id,
    );
    setRunners(runers);
  }, [eventMarket]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = eventBet.stake;
    }
  }, [eventBet.stake]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="bet-table-popup">
      <div className="modal-header">
        <h5 className="modal-title">Bet Slip</h5>
        <button
          type="button"
          aria-label="Close"
          className="close-bet"
          onClick={() => {
            toggle();
            dispatch(resetEventBet());
            dispatch(
              setMarketPlForecast({
                marketId: eventBet.market._id,
                plForecast: [0, 0],
              }),
            );
          }}
        >
          <img src="./images/close.svg" alt="close" className="w-50 h-50" />
        </button>
      </div>
      <ModalBody>
        <div className="betting-dashboard">
          {betLoading ? <LoadingRelative /> : null}
          <div className={`dashboard-data ${eventBet?.betType}-bet`}>
            <div className="buttonset">
              <div className="bet-amount-block">
                <div className="bet-amount-disc">
                  <div className="betting-user-disc p-0">
                    <div className="disc text-black">
                      {eventMarket?.event?.name || ''}
                    </div>
                    <div className="name text-black">
                      {eventBet.market.name}
                    </div>
                  </div>
                  <div className="points">
                    <div className="category text-black">
                      {eventBet?.runner?.name || ''}
                    </div>
                    <div className="selection">
                      <form action="">
                        <p className="qty">
                          <input
                            type="number"
                            name="qty"
                            id="qty"
                            step="0.01"
                            min={0}
                            value={eventBet?.price || 0}
                            onChange={(e) =>
                              updateStake({ price: Number(e.target.value) })
                            }
                          />
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-baseline">
                  <input
                    type="number"
                    placeholder="Amount"
                    className="type-aminunt form-control w-50"
                    value={eventBet?.stake}
                    ref={inputRef}
                    onKeyDown={placeBetOnEnter}
                    onChange={(e) =>
                      updateStake({ stake: Number(e.target.value) })
                    }
                  />
                  <div className="pe-2 small">
                    {eventBet.absoluteBetProfit ? (
                      <span className="text-success">
                        <span className="pe-1">Profit:</span>
                        {eventBet.absoluteBetProfit.toFixed(0)}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="amount-choose">
                  {stakeButtons?.map((btn) => (
                    <button
                      type="button"
                      className="amounts"
                      key={btn._id}
                      onClick={() => updateStake({ stake: btn.priceValue })}
                    >
                      {btn.priceLabel
                        ? btn.priceLabel
                        : shortNumber(btn.priceValue)}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="amounts fw-bold"
                    style={{ color: '#d97706' }}
                    onClick={() => updateStake({ max: true })}
                  >
                    MAX
                  </button>
                </div>
              </div>
              <button
                className="custom-buttton"
                type="button"
                disabled={eventBet?.stake === 0 || eventBet?.isBetLock}
                onClick={() => placeBet()}
              >
                Place bet
              </button>
            </div>
            {![MARKET_NAMES.FANCY1, MARKET_NAMES.NORMAL].includes(
              eventBet.market.name,
            ) && runners?.runners?.length
              ? runners?.runners?.map((runner) => (
                  <div className="row mt-2 fw-normal" key={runner?._id}>
                    <div className="col-8">
                      <span>{runner?.name || ''}</span>
                    </div>
                    {runners?.runnerPls?.[runner._id]?.pl !== 0 ? (
                      <div
                        className={`col-4 text-end ${
                          runners.runnerPls?.[runner._id]?.pl > 0
                            ? 'text-success'
                            : 'text-danger'
                        }`}
                      >
                        {roundNumber(runners.runnerPls?.[runner._id]?.pl, 0)}
                      </div>
                    ) : null}
                  </div>
                ))
              : ''}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default BetSlipPopup;
