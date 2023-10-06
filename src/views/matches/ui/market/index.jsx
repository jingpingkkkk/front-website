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

  const markets = {
    'Match Odds': <MatchOdds market={market} />,
    Bookmaker: <BookMaker market={market} />,
    Normal: <Fancy market={market} />,
  };

  return markets[market?.name] || null;
}

export default Market;
