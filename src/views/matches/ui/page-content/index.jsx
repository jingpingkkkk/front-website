import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
} from 'reactstrap';
import { postRequest } from '../../../../api';
import LoadingOverlay from '../../../../components/common/loading-overlay';
import eventBet, { resetEventBet } from '../../../../redux/reducers/event-bet';
import {
  resetEventMarket,
  setEvent,
  setMarkets,
} from '../../../../redux/reducers/event-market';
import { addEventMarketBets } from '../../../../redux/reducers/user-bets';
import Market from '../market';
import '../matches.css';

function MatchPageContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId = null } = location.state || {};

  const dispatch = useDispatch();
  const eventMarket = useSelector((state) => state.eventMarket);

  const [loading, setLoading] = useState(false);
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const fetchEventMarkets = async () => {
    setLoading(true);
    const result = await postRequest('event/getEventMatchDataFront', {
      eventId,
    });

    if (result?.success) {
      const event = result.data.details;
      dispatch(
        setEvent({
          eventId: event._id,
          name: event?.name,
          competitionName: event?.competitionName,
          startsOn: event.matchDate,
        }),
      );

      const marketData = event.market.map((market) => {
        return {
          _id: market._id,
          apiMarketId: market.marketId,
          apiEventId: market.apiEventId,
          name: market.name,
          eventName: event.name,
          plForecast: [0, 0],
          minStake: market.minStake,
          maxStake: market.maxStake,
          betDelay: market.betDelay,
          isBetLock: market.isBetLock || false,
          runners: market.market_runner.map((runner, index) => {
            return {
              _id: runner._id,
              selectionId: runner.selectionId,
              name: runner.runnerName,
              priority: index,
              pl: 0,
              status: runner?.matchOdds?.status,
              minStake: runner?.matchOdds?.min,
              maxStake: runner?.matchOdds?.max,
              GameStatus: runner?.matchOdds?.GameStatus,
            };
          }),
        };
      });
      dispatch(setMarkets(marketData));
    }
    setLoading(false);
  };

  const fetchUserEventBets = async () => {
    const result = await postRequest('bet/getUserEventBets', { eventId });
    if (result?.success) {
      const marketBets = result.data.details;
      dispatch(addEventMarketBets({ eventId, marketBets }));
    }
  };

  useEffect(() => {
    if (!eventId) {
      navigate('/sports');
    }
    Promise.all([
      fetchEventMarkets(),
      setInterval(() => {
        fetchUserEventBets();
      }, 3000),
    ]);
    return () => {
      dispatch(resetEventBet());
      dispatch(resetEventMarket());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  useEffect(() => {
    if (!eventId) {
      navigate('/sports');
    }
    fetchUserEventBets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventBet.market]);

  // const toggleLoginModal = () => {
  //   setIsLoginModalOpen(!isLoginModalOpen);
  // };

  return loading ? (
    <LoadingOverlay />
  ) : (
    <div className="comman-bg">
      <div className="d-flex justify-content-between align-items-center custom-buttton">
        <div>
          {eventMarket.event.competitionName} &gt; {eventMarket.event.name}
        </div>
        <div>
          {moment(eventMarket.event.startsOn).format(
            'DD/MM/YYYY HH:mm:ss (UTCZ)',
          )}
        </div>
      </div>
      <UncontrolledAccordion
        className="mt-1"
        defaultOpen={eventMarket.markets.map((mkt) => mkt._id)}
        stayOpen
      >
        {eventMarket.markets.map((market) => (
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
              <Market market={market} />
            </AccordionBody>
          </AccordionItem>
        ))}
      </UncontrolledAccordion>
      {/* <BetSlipPopup isOpen={isLoginModalOpen} toggle={toggleLoginModal} /> */}
    </div>
  );
}

export default MatchPageContent;
