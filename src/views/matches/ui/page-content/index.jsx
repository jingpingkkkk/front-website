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
import { resetEventBet } from '../../../../redux/reducers/event-bet';
import {
  resetEventMarket,
  setEvent,
  setMarkets,
} from '../../../../redux/reducers/event-market';
import Market from '../market';
import '../matches.css';
import ScoreBoard from '../score-board';
import { shortNumber } from '../../../../helper/number';
import { MARKET_NAMES } from '../../helpers/constants';

function MatchPageContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId = null } = location.state || {};
  const { marketId = null } = location.state || {};
  const { sportName = null } = location.state || {};

  const dispatch = useDispatch();
  const eventMarket = useSelector((state) => state.eventMarket);

  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const syncEventData = async () => {
    const urlEndPoint =
      sportName === 'Greyhound Racing'
        ? 'getRacingMatchData'
        : 'getEventMatchDataFront';
    const body = {
      eventId,
    };
    if (sportName === 'Greyhound Racing') {
      body.marketId = marketId;
    }
    const result = await postRequest(`event/${urlEndPoint}`, body);

    if (result?.success) {
      const event = result.data.details;
      setIsLive(event?.isLive);
      dispatch(
        setEvent({
          eventId: event._id,
          name: event.name,
          competitionName: event?.competitionName,
          startsOn: event.matchDate,
          videoStreamId: event?.videoStreamId || null,
          apiEventId: event?.apiEventId,
          sportsName: event?.sportsName || null,
        }),
      );
    }
  };

  const fetchEventMarkets = async () => {
    setLoading(true);
    const urlEndPoint =
      sportName === 'Greyhound Racing'
        ? 'getRacingMatchData'
        : 'getEventMatchDataFront';
    const body = {
      eventId,
    };
    if (sportName === 'Greyhound Racing') {
      body.marketId = marketId;
    }
    const result = await postRequest(`event/${urlEndPoint}`, body);

    if (result?.success) {
      const event = result.data.details;
      setIsLive(event?.isLive);
      dispatch(
        setEvent({
          eventId: event._id,
          name: event.name,
          competitionName: event?.competitionName,
          startsOn: event.matchDate,
          videoStreamId: event?.videoStreamId || null,
          apiEventId: event?.apiEventId,
          sportsName: event?.sportsName || null,
        }),
      );
      const evntmarket = event.market;
      const marketData = evntmarket.map((market) => {
        return {
          _id: market._id,
          eventId: market.eventId,
          apiMarketId: market.marketId,
          apiEventId: market.apiEventId,
          name:
            sportName === 'Greyhound Racing'
              ? market?.bet_category.name
              : market?.name, // change key from backend
          eventName: event.name,
          plForecast: [0, 0],
          runnerPls: {},
          minStake: market.minStake,
          maxStake: market.maxStake,
          betDelay: market.betDelay,
          isBetLock: market.isBetLock || false,
          sportsName: event?.sportsName || null,
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
    const interval = setInterval(async () => {
      await syncEventData();
    }, 1000 * 10);
    fetchEventMarkets();
    return () => {
      clearInterval(interval);
      dispatch(resetEventBet());
      dispatch(resetEventMarket());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return loading ? (
    <LoadingOverlay />
  ) : (
    <div className="comman-bg">
      <div className="d-flex justify-content-between align-items-center custom-buttton event-header">
        <div>
          {eventMarket.event.competitionName} &gt; {eventMarket.event.name}
        </div>
        <div className="event-date">
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
          {isLive ? <ScoreBoard event={eventMarket?.event} /> : ''}
          {eventMarket.markets.map((market) => (
            <AccordionItem key={market?._id}>
              <AccordionHeader
                targetId={market?._id}
                className="bet-table-header"
              >
                <div className="text-uppercase">{market.name}</div>
                {/* <div className="btn btn-success btn-sm disabled">Cashout</div> */}
                {market?.name === MARKET_NAMES.MATCH_ODDS ||
                market?.name === MARKET_NAMES.BOOKMAKER ? (
                  <span className="max-bet d-none-desktop">
                    <span title="Max : 1">
                      Min:{' '}
                      <span className="me-1">
                        {shortNumber(market?.minStake)}
                      </span>
                    </span>
                    <span title="Min : 1">
                      Max: <span>{shortNumber(market?.maxStake)}</span>
                    </span>
                  </span>
                ) : (
                  ''
                )}
              </AccordionHeader>

              <AccordionBody accordionId={market?._id}>
                <Market market={market} eventId={eventId} />
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
