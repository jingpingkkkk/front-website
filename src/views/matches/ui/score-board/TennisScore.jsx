import React, { useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import './score-board.css';

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const marketUrl = `${socketUrl}/market`;

function TennisScore({ event }) {
  const socket = useMemo(() => io(marketUrl, { autoConnect: false }), []);
  const previousValue = useRef(0);
  const [score, setScore] = useState({});
  const handleMarketData = (data) => {
    if (data) {
      setScore(data);
      previousValue.current = data?.score?.away?.highlight
        ? data?.score?.away?.inning1?.runs
        : data?.score?.home?.inning1?.runs;
    }
  };
  useEffect(() => {
    socket.emit(
      'join:market',
      { id: event?.apiEventId, type: 'live_score' },
      handleMarketData,
    );
    socket.connect();
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
  return (
    <div className="score-Other ng-star-inserted" id="other_ev">
      <div className="tennis-score-card">
        <div className="tennis-player">
          <span className="player-name">
            {score?.score?.home?.name} Combined Campuses & Colleges{' '}
          </span>
          <span className="set current">{score?.score?.home?.score}</span>
          <span className="set current">{score?.score?.home?.games}</span>
        </div>

        <div className="tennis-player">
          <span className="player-name">
            {score?.score?.away?.name}
            <span className="serve" />
          </span>
          <span className="set current">{score?.score?.away?.score}</span>
          <span className="set current">{score?.score?.away?.games}</span>
        </div>
        <div className="tennis-player">
          <span className="player-name set-title">
            Set {score?.currentSet || 0}{' '}
            {score?.matchStatus ? `(${score?.matchStatus})` : ''}
          </span>
          {/* <span className="set set-count tennis-point-title">POINT</span>
          <span className="set set-count">1</span> */}
        </div>
      </div>
    </div>
  );
}
export default TennisScore;
