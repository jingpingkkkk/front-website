import React from 'react';
import MatchOdds from './MatchOdds';
import BookMaker from './BookMaker';

function Market({ market }) {
  const markets = {
    'Match Odds': <MatchOdds market={market} />,
    Bookmaker: <BookMaker market={market} />,
  };
  return markets[market?.name] || null;
}

export default Market;
