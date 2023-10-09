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

function BatSlip({ enableLiveVideo = true, liveVideoId = '1' }) {
  const eventBet = useSelector((state) => state.eventBet);

  const [openIds, setOpenIds] = useState(['1', '2', '3']);
  const [togglePlayback, setTogglePlayback] = useState(false);

  useEffect(() => {
    if (eventBet.market?._id) {
      setOpenIds(['2', '3']);
    } else {
      setOpenIds(['3']);
    }
  }, [eventBet.market]);

  return (
    <div className="col-md-12 col-sm-12 col-12 last-sidebar comman-bg right-sidebar casino-right-sidebar d-none d-lg-block">
      <UncontrolledAccordion stayOpen defaultOpen={openIds}>
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
              enableLiveVideo={enableLiveVideo}
              liveVideoId={liveVideoId}
            />
          </AccordionBody>
        </AccordionItem>

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
  );
}

export default BatSlip;
