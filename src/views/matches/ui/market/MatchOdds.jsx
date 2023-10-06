/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import { io } from 'socket.io-client';
import shortNumber from '../../../../helper/number';
import { betTypes, setBetOdds } from '../../../../redux/reducers/event-bet';
import { setMarketPlForecast } from '../../../../redux/reducers/event-market';

const emptyOdds = {
  0: {
    back: [
      { price: 0, level: 0 },
      { price: 0, level: 1 },
      { price: 0, level: 2 },
    ],
    lay: [
      { price: 0, level: 0 },
      { price: 0, level: 1 },
      { price: 0, level: 2 },
    ],
  },
  1: {
    back: [
      { price: 0, level: 0 },
      { price: 0, level: 1 },
      { price: 0, level: 2 },
    ],
    lay: [
      { price: 0, level: 0 },
      { price: 0, level: 1 },
      { price: 0, level: 2 },
    ],
  },
  2: {
    back: [
      { price: 0, level: 0 },
      { price: 0, level: 1 },
      { price: 0, level: 2 },
    ],
    lay: [
      { price: 0, level: 0 },
      { price: 0, level: 1 },
      { price: 0, level: 2 },
    ],
  },
};

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const marketUrl = `${socketUrl}/market`;

function MatchOdds({ market }) {
  const socket = useMemo(() => io(marketUrl, { autoConnect: false }), []);

  const dispatch = useDispatch();

  const previousValue = useRef(emptyOdds);

  const [loading, setLoading] = useState(true);
  const [runnerOdds, setRunnerOdds] = useState(emptyOdds);
  const [min, setMin] = useState(market.minStake);
  const [max, setMax] = useState(market.maxStake);

  const handleMarketData = (data) => {
    if (data) {
      const { matchOdds } = data;
      const [teamOne, teamTwo, teamThree] = matchOdds;
      const teamOneData = { back: [], lay: [] };
      const teamTwoData = { back: [], lay: [] };
      const teamThreeData = { back: [], lay: [] };
      const { 0: runner1, 1: runner2, 2: runner3 } = previousValue.current;
      for (let i = 0; i < 3; i++) {
        teamOne.back[i].class =
          teamOne.back[i].price > runner1?.back[i]?.price
            ? 'odds-up'
            : teamOne.back[i].price < runner1?.back[i]?.price
            ? 'odds-down'
            : '';
        teamTwo.back[i].class =
          teamTwo.back[i].price > runner2?.back[i]?.price
            ? 'odds-up'
            : teamTwo.back[i].price < runner2?.back[i]?.price
            ? 'odds-down'
            : '';
        teamOne.lay[i].class =
          teamOne.lay[i].price > runner1?.lay[i]?.price
            ? 'odds-up'
            : teamOne.lay[i].price < runner1?.lay[i]?.price
            ? 'odds-down'
            : '';
        teamTwo.lay[i].class =
          teamTwo.lay[i].price > runner2?.lay[i]?.price
            ? 'odds-up'
            : teamTwo.lay[i].price < runner2?.lay[i]?.price
            ? 'odds-down'
            : '';
        if (teamThree) {
          teamThree.back[i].class =
            teamThree?.back[i].price > runner3?.back[i]?.price
              ? 'odds-up'
              : teamThree?.back[i].price < runner3?.back[i]?.price
              ? 'odds-down'
              : '';
          teamThree.lay[i].class =
            teamThree?.lay[i].price > runner3?.lay[i]?.price
              ? 'odds-up'
              : teamThree?.lay[i].price < runner3?.lay[i]?.price
              ? 'odds-down'
              : '';
        }

        teamOneData.back.push(teamOne.back[i] || {});
        teamOneData.lay.push(teamOne.lay[i] || {});
        teamTwoData.back.push(teamTwo.back[i] || {});
        teamTwoData.lay.push(teamTwo.lay[i] || {});
        teamThreeData.back.push(teamThree?.back[i] || {});
        teamThreeData.lay.push(teamThree?.lay[i] || {});
      }
      previousValue.current = {
        0: teamOneData,
        1: teamTwoData,
        2: teamThreeData,
      };
      setRunnerOdds({ 0: teamOneData, 1: teamTwoData, 2: teamThreeData });
      setMin(data?.min || 0);
      setMax(data?.max || 0);
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    socket.emit(
      'join:market',
      { id: market.apiMarketId, type: 'match_odds' },
      handleMarketData,
    );
    socket.on(`market:data:${market.apiMarketId}`, handleMarketData);
    socket.connect();
    return () => {
      socket.off(`market:data:${market.apiMarketId}`);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market]);

  const handleOddClick = (runner, odd, type) => {
    if (odd.price === 0) return;

    const selectedOdd = {
      market: {
        _id: market._id,
        apiMarketId: market.apiMarketId,
        name: market.name,
        betDelay: market.betDelay,
        minStake: market.minStake,
        maxStake: market.maxStake,
        isBetLock: market.isBetLock || false,
      },
      runner: {
        _id: runner._id,
        selectionId: runner.selectionId,
        name: runner.name,
        priority: runner.priority,
        pl: runner.pl,
      },
      price: odd.price,
      betType: type,
    };

    // dispatch(setBetStake(0)); // for resetting stake on odd click
    dispatch(setBetOdds(selectedOdd));
    dispatch(setMarketPlForecast({ marketId: market._id, plForecast: [0, 0] }));
  };

  return (
    <div className="pb-1">
      <div className="bet-table-row d-none-mobile">
        <div className="nation-name pe-2">
          <span className="max-bet">
            <span title={`Min:${shortNumber(min)}`}>
              Min:<span>{shortNumber(min)}</span>
            </span>
            <span className="ps-2" title={`Max:${shortNumber(max)}`}>
              Max:<span>{shortNumber(max)}</span>
            </span>
          </span>
        </div>

        <div className="back bl-title back-title">Back</div>
        <div className="lay bl-title lay-title">Lay</div>
      </div>

      {loading ? (
        <div className="col-md-12 text-center mt-2">
          <Spinner className="text-primary" />
        </div>
      ) : (
        market?.runners?.map((runner) => {
          return (
            <div key={runner?.name}>
              <div className="bet-table-mobile-row d-none-desktop">
                <div className="bet-table-mobile-team-name">
                  <span>{runner?.name || ''}</span>
                </div>
              </div>

              <div className="bet-table-row">
                <div className="nation-name d-none-mobile">
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <div>
                      <span>{runner?.name || ''}</span>
                      <span className="float-right" />
                      <div
                        className={`pt-1 small ${
                          runner.pl > 0
                            ? 'text-success'
                            : runner.pl < 0
                            ? 'text-danger'
                            : 'text-light'
                        }`}
                      >
                        {runner.pl ? runner.pl.toFixed(0) : ''}
                      </div>
                    </div>

                    {market?.plForecast[runner?.priority] !== 0 ? (
                      <div
                        className={`small ${
                          market?.plForecast[runner?.priority] > 0
                            ? 'text-success'
                            : 'text-danger'
                        }`}
                      >
                        {market?.plForecast[runner?.priority]?.toFixed(0)}
                      </div>
                    ) : null}
                  </div>
                </div>

                {runnerOdds[runner?.priority]?.back
                  ?.map((odd, i) => (
                    <button
                      type="button"
                      className={`bl-box back back${odd?.level || i} ${
                        odd?.class
                      }`}
                      key={`back-${odd?.level || i}`}
                      onClick={() => handleOddClick(runner, odd, betTypes.BACK)}
                    >
                      {odd?.price && odd.price !== 0 ? (
                        <>
                          <span className="d-block odds">
                            {odd?.price
                              ? parseFloat(odd.price.toFixed(2))
                              : '-'}
                          </span>
                          <span className="d-block">
                            {odd?.size ? shortNumber(odd.size, 2) : 0}
                          </span>
                        </>
                      ) : (
                        <span>-</span>
                      )}
                    </button>
                  ))
                  .reverse()}

                {runnerOdds[runner?.priority]?.lay?.map((odd, i) => (
                  <button
                    type="button"
                    className={`bl-box lay lay${odd?.level || i} ${odd?.class}`}
                    key={`lay-${odd?.level || i}`}
                    onClick={() => handleOddClick(runner, odd, betTypes.LAY)}
                  >
                    {odd?.price && odd.price !== 0 ? (
                      <>
                        <span className="d-block odds">
                          {odd?.price ? parseFloat(odd.price.toFixed(2)) : '-'}
                        </span>
                        <span className="d-block">
                          {odd?.size ? shortNumber(odd.size, 2) : 0}
                        </span>
                      </>
                    ) : (
                      <span>-</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MatchOdds;
