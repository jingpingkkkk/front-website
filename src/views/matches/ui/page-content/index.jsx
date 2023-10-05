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
import { io } from 'socket.io-client';
import { postRequest } from '../../../../api';
import LoadingOverlay from '../../../../components/common/loading-overlay';
import { resetEventBet } from '../../../../redux/reducers/event-bet';
import {
  resetEventMarket,
  setEvent,
  setMarketRunnerPl,
  setMarkets,
} from '../../../../redux/reducers/event-market';
import { addEventMarketBets } from '../../../../redux/reducers/user-bets';
import Market from '../market';
import '../matches.css';

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const marketUrl = `${socketUrl}/user-bet`;
const socket = io(marketUrl, {
  auth: { token: localStorage.getItem('userToken') },
  autoConnect: false,
});

function MatchPageContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId = null } = location.state || {};

  const dispatch = useDispatch();
  const eventMarket = useSelector((state) => state.eventMarket);
  const { user } = useSelector((state) => state.userDetails);

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

  useEffect(() => {
    if (!eventId) {
      navigate('/sports');
    }
    fetchEventMarkets();
    return () => {
      dispatch(resetEventBet());
      dispatch(resetEventMarket());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  useEffect(() => {
    const handleBetPlData = ({ marketBets, marketPls }) => {
      dispatch(addEventMarketBets({ eventId, marketBets }));
      marketPls.forEach((pls) => {
        dispatch(setMarketRunnerPl(pls));
      });
    };
    console.log('here');
    socket.emit('event:bet', { eventId }, handleBetPlData);
    socket.on(`event:bet:${user._id}`, handleBetPlData);

    socket.connect();
    return () => {
      socket.disconnect();
      socket.off(`event:bet:${user._id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventMarket.eventId]);

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

      {eventMarket.markets?.length ? (
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
                {/* <div className="btn btn-success btn-sm disabled">Cashout</div> */}
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
      ) : null}
      {/* <BetSlipPopup isOpen={isLoginModalOpen} toggle={toggleLoginModal} /> */}
    </div>
  );
}

export default MatchPageContent;
