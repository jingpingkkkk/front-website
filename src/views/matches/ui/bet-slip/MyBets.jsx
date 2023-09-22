import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
} from 'reactstrap';

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
                    <th className="text-secondary small">RUNNER</th>
                    <th className="text-end text-secondary small">ODDS</th>
                    <th className="text-end text-secondary small">STAKE</th>
                  </tr>
                </thead>
                <tbody>
                  {bm.bets.map((bet) => (
                    <tr key={bet._id}>
                      <td className="py-1">
                        <div
                          className="ps-2 py-2"
                          style={{
                            borderLeft: `5px solid ${
                              bet.isBack ? '#72bbef' : '#f994ba'
                            }`,
                          }}
                        >
                          <div className="text-start">{bet.runnerName}</div>
                          <div className="text-secondary pt-1 small">
                            {moment(bet.createdAt).format(
                              'DD-MM-YYYY HH:mm:ss',
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-end">{bet.odds.toFixed(2)}</td>
                      <td className="py-3 text-end">{bet.stake}</td>
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
