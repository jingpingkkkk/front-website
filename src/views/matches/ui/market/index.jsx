import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { postRequest } from '../../../../api';
import { setMarketRunnerPl } from '../../../../redux/reducers/event-market';
import { addEventMarketBets } from '../../../../redux/reducers/user-bets';
import BookMaker from './BookMaker';
import Fancy from './Fancy';
import Fancy1 from './Fancy1';
import MatchOdds from './MatchOdds';

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const marketUrl = `${socketUrl}/user-bet`;

function Market({ market, eventId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails);
  const eventMarkets = useSelector((state) => state.eventMarket.markets);

  const socket = useMemo(() => {
    return io(marketUrl, {
      auth: { token: localStorage.getItem('userToken') },
      autoConnect: false,
    });
  }, []);

  const currentMarket = eventMarkets.find((m) => m._id === market._id);

  const markets = {
    'Match Odds': <MatchOdds market={currentMarket} />,
    Bookmaker: <BookMaker market={currentMarket} />,
    Normal: <Fancy market={currentMarket} />,
    Fancy1: <Fancy1 market={currentMarket} />,
  };

  const handleBetPlData = ({ marketBets, marketPls }) => {
    dispatch(addEventMarketBets({ eventId, marketBets }));
    marketPls.forEach((pls) => {
      dispatch(setMarketRunnerPl(pls));
    });
  };

  useEffect(() => {
    socket.emit('event:bet', { eventId }, handleBetPlData);
    socket.on(`event:bet:${user._id}`, handleBetPlData);
    socket.connect();
    return () => {
      socket.disconnect();
      socket.off(`event:bet:${user._id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, market._id]);

  useEffect(() => {
    const fetchUserBetsAndPls = async () => {
      const result = await postRequest('bet/getAllUserBetsAndPls', {
        userId: user._id,
        eventId,
      });
      if (result.success) {
        handleBetPlData(result.data.details);
      }
    };
    const interval = setInterval(async () => {
      await fetchUserBetsAndPls();
    }, 1000 * 10);
    fetchUserBetsAndPls();
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return markets[market?.name] || null;
}

export default Market;
