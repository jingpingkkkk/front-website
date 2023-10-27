/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import './score-board.css';
import { io } from 'socket.io-client';

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const marketUrl = `${socketUrl}/market`;

function CricketScore({ event }) {
  const socket = useMemo(() => io(marketUrl, { autoConnect: false }), []);
  const [score, setScore] = useState({});
  const [crr, setCrr] = useState(0);
  const [ballRun, setBallRun] = useState(0);
  const [teamRun, setTeamRun] = useState(0);
  const [prevTeamRun, setPrevTeamRun] = useState(0);
  const [currentBetting, setCurrentBetting] = useState(null);
  const calculateRun = (run = 0, over = 0) => {
    return run ? (Number(run) / Number(over)).toFixed(2) : 0;
  };

  const countCurrentRunRate = (data) => {
    const betting = data?.score?.away?.highlight
      ? data?.score?.away
      : data?.score?.home;
    setCurrentBetting(betting);
    const runs = betting?.inning1?.runs || 0;
    const currentRun = runs
      ? Number(runs) / Number(betting?.inning1?.overs)
      : 0;
    setCrr(currentRun.toFixed(2));
    setTeamRun(runs);
  };

  useEffect(() => {
    const difference = prevTeamRun > 0 ? teamRun - prevTeamRun : 0;
    setBallRun(difference);
    setPrevTeamRun(teamRun);
  }, [currentBetting?.inning1?.overs]);

  const handleMarketData = (data) => {
    if (data) {
      setScore(data);
      countCurrentRunRate(data);
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
    <div className="scorecard cricket-m-hide">
      <div className="row">
        <div className="col-md-12 col-lg-12 pr-1">
          <div className="team-1 row">
            <div className="col-md-12 col-lg-12 ng-star-inserted">
              <span className="score-team-name sixty d-inline me-3 team-score-team-name">
                {score?.score?.home?.name}
              </span>
              <span className="score-team-name wtest d-inline me-2 ng-star-inserted">
                {score?.score?.home?.inning1?.runs || 0}-
                {score?.score?.home?.inning1?.wickets || 0}(
                {score?.score?.home?.inning1?.overs || 0})
              </span>
              <span className="score-team-name crr float-end d-inline teamname-widht">
                <span className="alg_rt">
                  CRR
                  <span className="ms-1 me-2">
                    {score?.score?.home?.highlight
                      ? crr
                      : calculateRun(
                          score?.score?.home?.inning1?.runs,
                          score?.score?.home?.inning1?.overs,
                        )}
                  </span>
                </span>
              </span>
            </div>
          </div>
          <div className="team-1 row">
            <div className="col-md-12 col-lg-12 ng-star-inserted">
              <span className="score-team-name sixty d-inline me-3 team-name-color">
                {score?.score?.away?.name}
              </span>
              <span className="score-team-name wtest d-inline me-2 ng-star-inserted">
                {score?.score?.away?.inning1?.runs || 0}-
                {score?.score?.away?.inning1?.wickets || 0}(
                {score?.score?.away?.inning1?.overs || 0})
              </span>
              <span className="score-team-name crr float-end d-inline teamname-widht">
                <span className="alg_rt">
                  CRR
                  <span className="ms-1 me-2">
                    {score?.score?.away?.highlight
                      ? crr
                      : calculateRun(
                          score?.score?.away?.inning1?.runs,
                          score?.score?.away?.inning1?.overs,
                        )}
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
        {/* <div className="col-md-5 col-lg-6 ps-1">
          <div className="row">
            <div className="col-md-12 padding-left0">
              <div className="row">
                <div className="col-md-12 padding-left0">
                  <p className="text-right ball-by-ball m-t-10" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className="row ">
        <div className="col-6 col-sm-6 col-md-6 col-xxl-6">
          <div className="lastsixball">
            <span className="lastball-runs m-l-5 ng-star-inserted">1</span>
            <span className="lastball-runs m-l-5 four ng-star-inserted">4</span>
            <span className="lastball-runs m-l-5 ng-star-inserted">1</span>
            <span className="lastball-runs m-l-5 four ng-star-inserted">4</span>
            <span className="lastball-runs m-l-5 ng-star-inserted">0</span>
            <span className="lastball-runs m-l-5 ng-star-inserted">0</span>
          </div>
        </div>
        <div className="col-6 col-sm-6 col-md-6 col-xxl-6">
          <div className="lastsixballs">
            <p className="text-right ball-by-ball m-t-10">
              <span className="ball-runs m-l-5 ng-star-inserted">0</span>
              <span className="ball-runs m-l-5 ng-star-inserted">0</span>
              <span className="ball-runs m-l-5 four ng-star-inserted">4</span>
              <span className="ball-runs m-l-5 ng-star-inserted">0</span>
            </p>
          </div>
        </div>
      </div> */}
      <div className="ballstatuscricket zm ng-star-inserted">
        <span>{ballRun}</span>
      </div>
      {/* {score?.stateOfBall?.bowlerName ? (
        <div className="text_nm ng-star-inserted">
          <span>{score?.stateOfBall?.bowlerName}</span>
        </div>
      ) : (
        ''
      )} */}
      <div className="row ng-star-inserted">
        <div className="col-md-12 ">
          <span className="commentary  custom-commentary">
            {/* {score?.matchStatus || ''} */}
          </span>
        </div>
      </div>
    </div>
  );
}
export default CricketScore;
