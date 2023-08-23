/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from 'reactstrap';
import shortNumber from '../../../../helper/number';
import {
  betTypes,
  resetEventBet,
  setBetPrice,
  setBetStake,
} from '../../../../redux/reducers/event-bet';
import { setMarketPlForecast } from '../../../../redux/reducers/event-market';

const amountArray = [
  1000, 2000, 5000, 10000, 20000, 25000, 50000, 75000, 90000, 95000,
];

function BatSlip() {
  const dispatch = useDispatch();
  const eventBet = useSelector((state) => state.eventBet);
  const eventMarket = useSelector((state) => state.eventMarket);

  const [open, setOpen] = useState('');

  const toggle = (id) => {
    setOpen(id === open ? '' : id);
  };

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

  const placeBet = () => {
    console.log(eventBet, eventMarket);
    // dispatch(resetEventBet());
  };

  return (
    <div className="col-md-12 col-sm-12 col-12 last-sidebar comman-bg right-sidebar casino-right-sidebar d-none d-lg-block">
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1" className="bet-table-header">
            TV
          </AccordionHeader>
          <AccordionBody accordionId="1">
            <div>
              <img
                src="images/screen-3.png"
                alt="img"
                className="w-100 h-100"
              />
            </div>
          </AccordionBody>
        </AccordionItem>
      </Accordion>

      {eventBet?.market ? (
        <div className="betting-sec">
          <div className="pramotion-title">BET SLIP</div>
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

export default BatSlip;
