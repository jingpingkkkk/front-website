/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
} from 'reactstrap';
import BetPanel from './BetPanel';
import EventTv from './EventTv';
import MyBets from './MyBets';
import MyBetsMobile from './MyBetsMobile';

function BatSlip() {
  const eventBet = useSelector((state) => state.eventBet);
  const { user } = useSelector((state) => state.userDetails);
  const { event } = useSelector((state) => state.eventMarket);
  const { eventMarketBets } = useSelector((state) => state.userBets);

  const { videoStreamId = null } = useSelector(
    (state) => state.eventMarket.event,
  );

  const [openIds, setOpenIds] = useState(['1', '2', '3']);
  const [togglePlayback, setTogglePlayback] = useState(false);
  const [betMarkets, setBetMarkets] = useState([]);
  const [totalBets, setTotalBets] = useState(0);
  const [isOpenMyBets, setIsOpenMyBets] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (eventBet.market?._id) {
      setOpenIds(['2', '3']);
    } else {
      setOpenIds(['3']);
    }
  }, [eventBet.market]);

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
      const betCount = bets.reduce(
        (accumulator, currentValue) => accumulator + currentValue.bets.length,
        0,
      );
      setTotalBets(betCount);
      setBetMarkets(bets);
    }
  }, [event, eventMarketBets]);

  return (
    <div className="right-bet-bar">
      <div className="col-md-12 col-sm-12 col-12 last-sidebar comman-bg right-sidebar casino-right-sidebar d-none d-lg-block">
        <UncontrolledAccordion stayOpen defaultOpen={openIds}>
          {user.balance >= 500 && videoStreamId ? (
            <AccordionItem>
              <AccordionHeader
                targetId="1"
                className="bet-table-header"
                onClick={() => setTogglePlayback(!togglePlayback)}
              >
                TV
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <EventTv
                  togglePlayback={togglePlayback}
                  videoStreamId={videoStreamId}
                />
              </AccordionBody>
            </AccordionItem>
          ) : null}

          {eventBet.market?._id ? (
            <AccordionItem>
              <AccordionHeader targetId="2" className="bet-table-header">
                BET SLIP
              </AccordionHeader>
              <AccordionBody accordionId="2">
                <BetPanel />
              </AccordionBody>
            </AccordionItem>
          ) : null}

          <AccordionItem>
            <AccordionHeader targetId="3" className="bet-table-header">
              MY BETS
            </AccordionHeader>
            <AccordionBody accordionId="3">
              <MyBets />
            </AccordionBody>
          </AccordionItem>
        </UncontrolledAccordion>
      </div>
      {totalBets > 0 ? (
        <div
          className="market-show-icon d-none-desktop"
          role="button"
          tabIndex="0"
          onClick={() => setIsOpenMyBets(true)}
        >
          <span>{totalBets || 0}</span>
        </div>
      ) : (
        ''
      )}
      {isOpenMyBets ? (
        <MyBetsMobile
          isOpen={isOpenMyBets}
          toggle={() => setIsOpenMyBets(false)}
          betMarkets={betMarkets}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default BatSlip;
