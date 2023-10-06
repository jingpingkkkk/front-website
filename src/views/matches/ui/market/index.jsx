import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { setMarketRunnerPl } from '../../../../redux/reducers/event-market';
import { addEventMarketBets } from '../../../../redux/reducers/user-bets';
import BookMaker from './BookMaker';
import Fancy from './Fancy';
import MatchOdds from './MatchOdds';

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const marketUrl = `${socketUrl}/user-bet`;
const socket = io(marketUrl, {
  auth: { token: localStorage.getItem('userToken') },
  autoConnect: false,
});

function Market({ market, eventId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails);
  const eventMarkets = useSelector((state) => state.eventMarket.markets);

  const currentMarket = eventMarkets.find((m) => m._id === market._id);
  const markets = {
    'Match Odds': <MatchOdds market={currentMarket} />,
    Bookmaker: <BookMaker market={currentMarket} />,
    Normal: <Fancy market={currentMarket} />,
  };

  useEffect(() => {
    const handleBetPlData = ({ marketBets, marketPls }) => {
      dispatch(addEventMarketBets({ eventId, marketBets }));
      marketPls.forEach((pls) => {
        dispatch(setMarketRunnerPl(pls));
      });
    };
    socket.emit('event:bet', { eventId }, handleBetPlData);
    socket.on(`event:bet:${user._id}`, handleBetPlData);

    socket.connect();
    return () => {
      socket.disconnect();
      socket.off(`event:bet:${user._id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, market._id]);

  // useEffect(() => {
  //   const fetchRunnerPls = async () => {
  //     const result = await postRequest('bet/getRunnerPlsFancy', {
  //       marketId: market._id,
  //       eventId: event.eventId,
  //     });
  //     if (result.success) {
  //       const runnerPls = result.data.details;
  //       setRunnerPLS(runnerPls);
  //       dispatch(setMarketRunnerPl(runnerPls));
  //     }
  //   };

  //   fetchRunnerPls();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [eventBetMarket]);

  return markets[market?.name] || null;
}

export default Market;
