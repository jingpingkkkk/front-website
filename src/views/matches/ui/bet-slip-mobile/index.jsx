/* eslint-disable no-nested-ternary */
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
import { setMarketPlForecast } from '../../../../redux/reducers/event-market';
import './bet-slip.css';

function MobileBetPanel() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
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

  const calculateNormalStake = (betType, quantity, pl, size) => {
    let absoluteBetProfit = 0;
    if (betType === betTypes.BACK) {
      absoluteBetProfit = pl + (quantity * size) / 100;
    } else {
      absoluteBetProfit = quantity;
    }
    return { absoluteBetProfit };
  };

  const updateStake = ({ stake = null, price = null, max = false }) => {
    const { betType, market, size } = eventBet;
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
    } else if (eventBet?.market?.name === 'Normal') {
      const { absoluteBetProfit: ap } = calculateNormalStake(
        betType,
        quantity,
        pl,
        size,
      );
      absoluteBetProfit = ap;
    } else if (eventBet?.market?.name === 'Fancy1') {
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
    }
    dispatch(setAbsoluteBetProfit(absoluteBetProfit));
    dispatch(setBetStake(quantity));
    dispatch(setBetPrice(rate));
    dispatch(setBetSize(size));
    dispatch(setMarketPlForecast({ marketId: market._id, plForecast }));
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

      const forecast = { marketId: eventBet.market._id, plForecast: [0, 0] };

      setTimeout(() => {
        dispatch(setMarketPlForecast(forecast));
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
    <div className="bet-collapse animated animatedfadeInDown fadeInDown mt-2">
      {betLoading ? <LoadingRelative /> : null}
      <div className={`bet-cont ${eventBet?.betType}-border`}>
        <div className="bet-input-container">
          <div className={`bs-top-content ${eventBet?.betType}-top`}>
            <div className="odd-info">
              <span className={`profit ml-5 ${eventBet?.betType}-text`}>
                <span className="ms-3">
                  {eventBet?.betType === 'back' ? 'Profit' : 'Exposure'}{' '}
                </span>
                <span className="ms-2 small">
                  {eventBet.absoluteBetProfit ? (
                    eventBet.absoluteBetProfit > 0 ? (
                      <span className="text-success">
                        {eventBet.absoluteBetProfit.toFixed(0)}
                      </span>
                    ) : (
                      <span className="text-danger">
                        {eventBet.absoluteBetProfit.toFixed(0)}
                      </span>
                    )
                  ) : null}
                </span>
              </span>
            </div>
            <div className="spin input-group">
              <input
                type="number"
                className={`form-control ${eventBet?.betType}-border ${eventBet?.betType}-text`}
                name="qty"
                id="qty"
                step="0.01"
                min={0}
                value={eventBet?.price || 0}
                onChange={(e) => updateStake({ price: Number(e.target.value) })}
              />
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
                className="close-bet-btn right bg-transparent"
              >
                <img src="./images/close.svg" alt="close" />
              </button>
            </div>
            <div className="custom-btn">
              <input
                type="number"
                className={`${eventBet?.betType}-border ${eventBet?.betType}-text`}
                value={eventBet?.stake}
                ref={inputRef}
                onKeyDown={placeBetOnEnter}
                onChange={(e) => updateStake({ stake: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="bid-rate betslip-button">
            {stakeButtons?.map((btn) => (
              <button
                type="button"
                className={`amounts ${eventBet?.betType}-text ${eventBet?.betType}-border`}
                key={btn._id}
                onClick={() => updateStake({ stake: btn.priceValue })}
              >
                {btn.priceLabel ? btn.priceLabel : shortNumber(btn.priceValue)}
              </button>
            ))}
            <button
              type="button"
              className={`amounts ${eventBet?.betType}-text ${eventBet?.betType}-border text-warning`}
              onClick={() => updateStake({ max: true })}
            >
              MAX
            </button>
          </div>
          <button
            disabled={eventBet?.stake === 0 || eventBet?.isBetLock}
            className={`betslip-place-button ${eventBet?.betType}-color`}
            type="button"
            onClick={() => placeBet()}
          >
            Place bet
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileBetPanel;
