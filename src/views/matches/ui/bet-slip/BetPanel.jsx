/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest } from '../../../../api';
import LoadingRelative from '../../../../components/common/loading-relative';
import { shortNumber } from '../../../../helper/number';
import defaultStakeButtons from '../../../../helper/stake-buttons';
import ToastAlert from '../../../../helper/toast-alert';
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
import useRunnerPl from '../../hooks/use-runner-pl';

function BetPanel() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const eventBet = useSelector((state) => state.eventBet);
  const eventMarket = useSelector((state) => state.eventMarket);
  const userDetails = useSelector((state) => state.userDetails);
  const { calculateRunnerPl, calculateAbsolutePl } = useRunnerPl();

  const stakeButtons =
    userDetails?.gameButtons?.inputValues || defaultStakeButtons;

  const [betLoading, setBetLoading] = useState(false);

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
    if (inputRef.current) {
      inputRef.current.value = eventBet.stake;
    }
  }, [eventBet.stake]);

  return (
    <div>
      {eventBet?.market ? (
        <div className="betting-sec position-relative">
          {betLoading ? <LoadingRelative /> : null}
          <div className="betting-dashboard">
            <div className="dashboard-data">
              <div className="buttonset">
                <div className="bet-amount-block">
                  <div className="bet-amount-disc">
                    <div className="betting-user-disc">
                      <div className="d-flex justify-content-between">
                        <div className="name text-uppercase">
                          {eventBet.market.name}
                        </div>

                        <button
                          type="button"
                          onKeyDown={placeBetOnEnter}
                          onClick={() => {
                            dispatch(resetEventBet());
                            dispatch(
                              setMarketPlForecast({
                                marketId: eventBet.market._id,
                                plForecast: [0, 0],
                              }),
                            );
                          }}
                          className="close-bet float-right"
                        >
                          <img
                            src="./images/close.svg"
                            alt="close"
                            className="w-50 h-75"
                          />
                        </button>
                      </div>

                      <div className="disc">
                        {eventMarket?.event?.name || ''}
                      </div>
                    </div>

                    <div className="points">
                      <div className="category">
                        {eventBet?.runner?.name || ''}
                      </div>

                      <div className="selection">
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
                        <>
                          {eventBet.absoluteBetProfit > 0 ? (
                            <span className="text-success">
                              {eventBet.absoluteBetProfit.toFixed(0)}
                            </span>
                          ) : (
                            <span className="text-danger">
                              {eventBet.absoluteBetProfit.toFixed(0)}
                            </span>
                          )}
                        </>
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
                  disabled={eventBet?.stake === 0 || eventBet?.isBetLock}
                  className="custom-buttton c-btn text-white"
                  type="button"
                  onClick={() => placeBet()}
                >
                  Place bet
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BetPanel;
