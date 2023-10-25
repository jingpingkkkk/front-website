import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { postRequest } from '../../../../api';
import { setMarketRunnerPl } from '../../../../redux/reducers/event-market';
import { addEventMarketBets } from '../../../../redux/reducers/user-bets';
import { MARKET_NAMES } from '../../helpers/constants';
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

  // In case if socket fails to cath event:bet:{userId}
  useEffect(() => {
    const fetchUserBetsAndPls = async () => {
      const body = { userId: user._id, eventId };
      const result = await postRequest('bet/getAllUserBetsAndPls', body);
      if (result.success) {
        handleBetPlData(result.data.details);
      }
    };
    const interval = setInterval(async () => {
      await fetchUserBetsAndPls();
    }, 1000 * 10);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentMarket = eventMarkets.find((m) => m._id === market._id);
  const markets = {
    [MARKET_NAMES.MATCH_ODDS]: <MatchOdds market={currentMarket} />,
    [MARKET_NAMES.BOOKMAKER]: <BookMaker market={currentMarket} />,
    [MARKET_NAMES.NORMAL]: <Fancy market={currentMarket} />,
    [MARKET_NAMES.FANCY1]: <Fancy1 market={currentMarket} />,
    [MARKET_NAMES.OVER_UNDER_15_GOALS]: <MatchOdds market={currentMarket} />,
    [MARKET_NAMES.OVER_UNDER_25_GOALS]: <MatchOdds market={currentMarket} />,
  };

  return markets[market?.name] || null;
}

export default Market;
