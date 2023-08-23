import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
} from 'reactstrap';
import {
  betTypes,
  setBetOdds,
  setBetStake,
} from '../../../../redux/reducers/event-bet';
import {
  resetEventMarket,
  setEvent,
  setMarketPlForecast,
  setMarkets,
} from '../../../../redux/reducers/event-market';
import BetSlipPopup from '../bet-slip-popup';
import matchItems from './items';
import './matches.css';

function MatchPageContent() {
  const dispatch = useDispatch();
  const { markets } = useSelector((state) => state.eventMarket);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    dispatch(
      setEvent({
        eventId: nanoid(),
        name: 'Northern Superchargers Women v Welsh Fire Women',
      }),
    );
    dispatch(
      setMarkets(
        matchItems.map((item) => ({
          ...item,
          plForecast: [0, 0],
        })),
      ),
    );
    return () => {
      dispatch(resetEventMarket());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleLoginModal = () => {
    setIsLoginModalOpen(!isLoginModalOpen);
  };

  const handleOddClick = (market, runner, odd, type) => {
    dispatch(
      setBetOdds({
        market: { _id: market._id, name: market.name },
        runner: {
          _id: runner._id,
          name: runner.name,
          priority: runner.priority,
        },
        price: odd.price,
        betType: type,
      }),
    );
    dispatch(setBetStake(0));
    dispatch(setMarketPlForecast({ marketId: market._id, plForecast: [0, 0] }));
  };

  return (
    <div className="comman-bg">
      <UncontrolledAccordion stayOpen>
        {markets.map((market) => {
          return (
            <AccordionItem key={market?._id}>
              <AccordionHeader
                targetId={market?._id}
                className="bet-table-header"
              >
                <div className="text-uppercase">{market.name}</div>
                <div className="btn btn-success btn-sm disabled">Cashout</div>
                <span className="max-bet d-none-desktop">
                  <span title="Max : 1">
                    Max: <span>1</span>
                  </span>
                </span>
              </AccordionHeader>

              <AccordionBody accordionId={market?._id}>
                <div className="bet-table-row d-none-mobile">
                  <div className="nation-name">
                    <span className="max-bet">
                      <span title="Max : 1">
                        Max: <span>1</span>
                      </span>
                    </span>
                  </div>
                  <div className="back bl-title back-title">Back</div>
                  <div className="lay bl-title lay-title">Lay</div>
                </div>

                {market?.runners?.map((runner) => {
                  return (
                    <div key={runner?.name}>
                      <div className="bet-table-mobile-row d-none-desktop">
                        <div className="bet-table-mobile-team-name">
                          <span>{runner?.name || ''}</span>
                        </div>
                      </div>

                      <div className="bet-table-row">
                        <div className="nation-name d-none-mobile">
                          <div className="w-100 d-flex justify-content-between align-items-center">
                            <p>
                              <span>{runner?.name || ''}</span>
                              <span className="float-right" />
                            </p>

                            {market?.plForecast[runner?.priority] !== 0 ? (
                              <div
                                className={`small ${
                                  market?.plForecast[runner?.priority] > 0
                                    ? 'text-success'
                                    : 'text-danger'
                                }`}
                              >
                                {market?.plForecast[runner?.priority]}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {runner?.back?.map((odd) => (
                          <button
                            type="button"
                            className={`bl-box back back${odd?.level}`}
                            key={odd?.level}
                            onClick={() =>
                              handleOddClick(market, runner, odd, betTypes.BACK)
                            }
                          >
                            <span className="d-block odds">
                              {odd?.price || 0}
                            </span>
                            <span className="d-block">{odd?.size || 0}</span>
                          </button>
                        ))}

                        {runner?.lay?.map((odd) => (
                          <button
                            type="button"
                            className={`bl-box lay lay${odd?.level}`}
                            key={odd?.level}
                            onClick={() =>
                              handleOddClick(market, runner, odd, betTypes.LAY)
                            }
                          >
                            <span className="d-block odds">
                              {odd?.price || 0}
                            </span>
                            <span className="d-block">{odd?.size || 0}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </AccordionBody>
            </AccordionItem>
          );
        })}
      </UncontrolledAccordion>

      <BetSlipPopup isOpen={isLoginModalOpen} toggle={toggleLoginModal} />
    </div>
  );
}

export default MatchPageContent;
