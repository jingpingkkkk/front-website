import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest } from '../../../../api';
import LoadingRelative from '../../../../components/common/loading-relative';
import ipDetails from '../../../../helper/ip-information';
import shortNumber from '../../../../helper/number';
import ToastAlert from '../../../../helper/toast-alert';
import {
  betTypes,
  resetEventBet,
  setBetPrice,
  setBetStake,
} from '../../../../redux/reducers/event-bet';
import { setMarketPlForecast } from '../../../../redux/reducers/event-market';
import { addUserBet } from '../../../../redux/reducers/user-bets';

const amountArray = [
  1000, 2000, 5000, 10000, 20000, 25000, 50000, 75000, 90000, 95000,
];

function BetPanel() {
  const dispatch = useDispatch();
  const eventBet = useSelector((state) => state.eventBet);
  const eventMarket = useSelector((state) => state.eventMarket);

  const [betLoading, setBetLoading] = useState(false);

  const updateStake = ({ stake = null, price = null }) => {
    const { betType, market } = eventBet;
    const { priority } = eventBet.runner;

    const quantity = stake || eventBet.stake;
    const rate = price || eventBet.price;

    const plForecast = [0, 0];

    if (betType === betTypes.BACK) {
      plForecast[priority] = rate * quantity - quantity;
      plForecast[priority === 0 ? 1 : 0] = -quantity;
    } else {
      plForecast[priority] = -(rate * quantity - quantity);
      plForecast[priority === 0 ? 1 : 0] = quantity;
    }

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
        runnerId: eventBet.runner._id,
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
      }, eventBet.market.betDelay * 1000);
    } catch (e) {
      ToastAlert.danger(e.message);
      setBetLoading(false);
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
                          onClick={() => dispatch(resetEventBet())}
                          className="close-bet float-right"
                        >
                          <img
                            src="./images/close.svg"
                            alt="close"
                            className="w-75 h-75"
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
                        <form action="">
                          <p className="qty">
                            <input
                              type="number"
                              name="qty"
                              id="qty"
                              step="1"
                              value={eventBet?.price || 0}
                              onChange={(e) =>
                                updateStake({ price: e.target.value })
                              }
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
                    value={eventBet?.stake || 0}
                    onChange={(e) => updateStake({ stake: e.target.value })}
                  />

                  <div className="amount-choose">
                    {amountArray?.map((amount) => (
                      <button
                        type="button"
                        className="amounts"
                        key={amount}
                        onClick={() => updateStake({ stake: amount })}
                      >
                        {shortNumber(amount)}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="custom-buttton"
                  type="button"
                  onClick={() => placeBet()}
                >
                  Place bet
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default BetPanel;
