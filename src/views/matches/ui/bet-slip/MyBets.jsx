import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
} from 'reactstrap';
import { roundNumber, shortNumber } from '../../../../helper/number';
import { MARKET_NAMES } from '../../helpers/constants';

const indexArr = Array.from({ length: 100 }, (_, i) => i.toString());

function MyBets() {
  const { event } = useSelector((state) => state.eventMarket);
  const { eventMarketBets } = useSelector((state) => state.userBets);

  const [betMarkets, setBetMarkets] = useState([]);
  useEffect(() => {
    const bets = [];
    if (event.eventId) {
      const eventMarkets = eventMarketBets[event.eventId];
      if (eventMarkets) {
        Object.keys(eventMarkets).forEach((marketId) => {
          const marketBets = eventMarkets[marketId];
          bets.push({
            marketId,
            marketName: marketBets[0].marketName,
            bets: marketBets,
          });
        });
      }
      setBetMarkets(bets);
    }
  }, [event, eventMarketBets]);

  return (
    <div className="p-1">
      <UncontrolledAccordion stayOpen defaultOpen={indexArr}>
        {betMarkets.map((bm, i) => (
          <AccordionItem key={bm.marketId}>
            <AccordionHeader
              targetId={i.toString()}
              className="bet-table-header"
            >
              {bm.marketName}
            </AccordionHeader>

            <AccordionBody accordionId={i.toString()}>
              <table className="table table-dark table-borderless small">
                <thead>
                  <tr>
                    <th
                      className="text-secondary small"
                      style={{ width: '43%' }}
                    >
                      Runner
                    </th>

                    <th
                      className="text-end text-secondary small"
                      style={{ width: '21%' }}
                    >
                      {bm.marketName === MARKET_NAMES.NORMAL ? 'Runs/' : ''}
                      Odds
                    </th>

                    <th
                      className="text-end text-secondary small"
                      style={{ width: '18%' }}
                    >
                      Stake
                    </th>

                    <th
                      className="text-end text-secondary small"
                      style={{ width: '18%' }}
                    >
                      P/L
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bm.bets.map((bet) => (
                    <tr key={bet._id}>
                      <td className={` ${bet.isBack ? 'back' : 'lay'}`}>
                        <div
                          className="ps-2 py-2 text-start"
                          style={{
                            borderLeft: `5px solid ${
                              bet.isBack ? '#72bbef' : '#f994ba'
                            }`,
                          }}
                        >
                          <div className="text-dark py-1">{bet.runnerName}</div>
                        </div>
                      </td>

                      <td
                        className={` py-3 text-end text-secondary ${
                          bet.isBack ? 'back' : 'lay'
                        }`}
                      >
                        {bm.marketName === MARKET_NAMES.NORMAL
                          ? `${bet?.runnerScore}/`
                          : ''}
                        {roundNumber(bet.odds)}
                      </td>

                      <td
                        className={` py-3 text-end text-secondary ${
                          bet.isBack ? 'back' : 'lay'
                        }`}
                      >
                        {shortNumber(bet.stake)}
                      </td>

                      <td
                        className={` py-3 text-end text-secondary ${
                          bet.isBack ? 'back' : 'lay'
                        }`}
                      >
                        {bet.isBack ? (
                          <div className="text-success">
                            +{shortNumber(bet.potentialWin, 2)}
                          </div>
                        ) : (
                          <div className="text-danger">
                            {shortNumber(bet.potentialLoss, 2)}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionBody>
          </AccordionItem>
        ))}
      </UncontrolledAccordion>
    </div>
  );
}

export default MyBets;
