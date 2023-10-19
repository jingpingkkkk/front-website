import React from 'react';
import CricketScore from './CricketScore';
import TennisScore from './TennisScore';

function ScoreBoard({ event }) {
  const sports = {
    Cricket: <CricketScore event={event} />,
    Tennis: <TennisScore event={event} />,
  };
  return sports[event?.sportsName] || null;
}

export default ScoreBoard;
