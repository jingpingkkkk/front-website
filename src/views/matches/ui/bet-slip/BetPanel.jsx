/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest } from '../../../../api';
import LoadingRelative from '../../../../components/common/loading-relative';
import ipDetails from '../../../../helper/ip-information';
import shortNumber from '../../../../helper/number';
import defaultStakeButtons from '../../../../helper/stake-buttons';
import ToastAlert from '../../../../helper/toast-alert';
import {
  betTypes,
  resetEventBet,
  setAbsoluteBetProfit,
  setBetPrice,
  setBetStake,
} from '../../../../redux/reducers/event-bet';
import { setMarketPlForecast } from '../../../../redux/reducers/event-market';
import { addUserBet } from '../../../../redux/reducers/user-bets';

function BetPanel() {
  const dispatch = useDispatch();

  const eventBet = useSelector((state) => state.eventBet);
  const eventMarket = useSelector((state) => state.eventMarket);
  const userDetails = useSelector((state) => state.userDetails);

  const stakeButtons =
    userDetails?.gameButtons?.inputValues || defaultStakeButtons;

  const [betLoading, setBetLoading] = useState(false);

  const calculateMatchOddStake = (
    betType,
    rate,
    quantity,
    oppRunner,
    priority,
    pl,
  ) => {
    let absoluteBetProfit = 0;
    const plForecast = [0, 0];
    if (betType === betTypes.BACK) {
      absoluteBetProfit = rate * quantity - quantity;
      plForecast[priority] = pl + rate * quantity - quantity;
      plForecast[priority === 0 ? 1 : 0] = oppRunner.pl + -quantity;
    } else {
      absoluteBetProfit = quantity;
      plForecast[priority] = pl + -(rate * quantity - quantity);
      plForecast[priority === 0 ? 1 : 0] = oppRunner.pl + quantity;
    }
    return { absoluteBetProfit, plForecast };
  };

  const calculateBookMakerStake = (
    betType,
    rate,
    quantity,
    oppRunner,
    priority,
    pl,
  ) => {
    let absoluteBetProfit = 0;
    const plForecast = [0, 0];
    if (betType === betTypes.BACK) {
      absoluteBetProfit = (rate * quantity) / 100;
      plForecast[priority] = pl + (rate * quantity) / 100;
      plForecast[priority === 0 ? 1 : 0] = oppRunner.pl + -quantity;
    } else {
      absoluteBetProfit = quantity;
      plForecast[priority] = pl + -((rate * quantity) / 100);
      plForecast[priority === 0 ? 1 : 0] = oppRunner.pl + quantity;
    }
    return { absoluteBetProfit, plForecast };
  };

  const updateStake = ({ stake = null, price = null, max = false }) => {
    const { betType, market } = eventBet;
    const { priority, pl, _id } = eventBet.runner;

    const oppRunner = eventMarket.markets
      .find((mkt) => mkt._id === market._id)
      ?.runners.find((runner) => runner._id !== _id);

    let quantity = eventBet.stake;
    let rate = eventBet.price;

    if (stake !== null) {
      if (stake < 0) return;
      quantity = stake;
    }
    if (price !== null) {
      if (price < 1) return;
      rate = price;
    }

    if (max) {
      const losingCapacity =
        userDetails.user.balance - userDetails.user.exposure;
      if (betType === betTypes.BACK) {
        quantity = losingCapacity;
      } else {
        quantity = Math.floor(losingCapacity / (rate - 1));
      }
    }

    let absoluteBetProfit = 0;
    let plForecast = [0, 0];

    if (eventBet?.market?.name === 'Match Odds') {
      const { absoluteBetProfit: ap, plForecast: pf } = calculateMatchOddStake(
        betType,
        rate,
        quantity,
        oppRunner,
        priority,
        pl,
      );
      absoluteBetProfit = ap;
      plForecast = pf;
    } else if (eventBet?.market?.name === 'Bookmaker') {
      const { absoluteBetProfit: ap, plForecast: pf } = calculateBookMakerStake(
        betType,
        rate,
        quantity,
        oppRunner,
        priority,
        pl,
      );
      absoluteBetProfit = ap;
      plForecast = pf;
    }

    dispatch(setAbsoluteBetProfit(absoluteBetProfit));
    dispatch(setBetStake(quantity));
    dispatch(setBetPrice(rate));
    dispatch(setMarketPlForecast({ marketId: market._id, plForecast }));
  };

  const placeBet = async () => {
    try {
      setBetLoading(true);

      const ipAddress = await ipDetails();

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
        ipAddress: ipAddress.ip,
      };

      const result = await postRequest('bet/createBet', body);
      if (!result.success) {
        throw new Error(result.message);
      }

      const newBet = { betDetails: result.data.details, eventBet };
      const forecast = { marketId: eventBet.market._id, plForecast: [0, 0] };

      setTimeout(() => {
        dispatch(addUserBet(newBet));
        dispatch(setMarketPlForecast(forecast));
        dispatch(resetEventBet());
        ToastAlert.success('Bet placed successfully.');
        setBetLoading(false);
        // }, eventBet.market.betDelay * 1000);
      }, 5 * 1000);
    } catch (e) {
      setBetLoading(false);
      console.log(e);
      // ToastAlert.error(e.message);
    }
  };

  const placeBetOnEnter = (e) => {
    if (e.key === 'Enter') {
      placeBet();
    }
  };

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
                      className="amounts text-warning"
                      onClick={() => updateStake({ max: true })}
                    >
                      MAX
                    </button>
                  </div>
                </div>

                <button
                  disabled={eventBet?.stake === 0 || eventBet?.isBetLock}
                  className="custom-buttton c-btn"
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
