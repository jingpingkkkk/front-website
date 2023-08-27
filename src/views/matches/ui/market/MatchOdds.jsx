/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { postRequest } from '../../../../api';
import shortNumber from '../../../../helper/number';
import {
  betTypes,
  setBetOdds,
  setBetStake,
} from '../../../../redux/reducers/event-bet';
import {
  setMarketPlForecast,
  setMarketRunnerPl,
} from '../../../../redux/reducers/event-market';

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
};

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const marketUrl = `${socketUrl}/market`;

function MatchOdds({ market }) {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.eventMarket);
  const { market: eventBetMarket } = useSelector((state) => state.eventBet);

  const socket = useMemo(() => io(marketUrl, { autoConnect: false }), []);

  const [runnerOdds, setRunnerOdds] = useState(emptyOdds);

  useEffect(() => {
    const fetchRunnerPls = async () => {
      const result = await postRequest('bet/getRunnerPls', {
        marketId: market._id,
        eventId: event.eventId,
      });
      if (result.success) {
        const runnerPls = result.data.details;
        dispatch(setMarketRunnerPl(runnerPls));
      }
    };

    fetchRunnerPls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventBetMarket]);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join:market', {
        id: market.apiMarketId,
        type: 'match_odds',
      });
    });

    socket.on(`market:data:${market.apiMarketId}`, (data) => {
      if (data) {
        const { matchOdds } = data;
        const [teamOne, teamTwo] = matchOdds;

        const teamOneData = { back: [], lay: [] };
        const teamTwoData = { back: [], lay: [] };

        for (let i = 0; i < 3; i++) {
          teamOneData.back.push(teamOne.back[i] || {});
          teamOneData.lay.push(teamOne.lay[i] || {});
          teamTwoData.back.push(teamTwo.back[i] || {});
          teamTwoData.lay.push(teamTwo.lay[i] || {});
        }

        setRunnerOdds({ 0: teamOneData, 1: teamTwoData });
      }
    });

    socket.connect();

    return () => {
      socket.off('connect');
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
        betDelay: 0,
        minStake: market.minStake,
        maxStake: market.maxStake,
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

    dispatch(setBetStake(0));
    dispatch(setBetOdds(selectedOdd));
    dispatch(setMarketPlForecast({ marketId: market._id, plForecast: [0, 0] }));
  };

  return (
    <div className="pb-1">
      <div className="bet-table-row d-none-mobile">
        <div className="nation-name pe-2">
          <span className="max-bet">
            <span title={`Min:${shortNumber(market.minStake)}`}>
              Min:<span>{shortNumber(market.minStake)}</span>
            </span>
            <span
              className="ps-2"
              title={`Max:${shortNumber(market.maxStake)}`}
            >
              Max:<span>{shortNumber(market.maxStake)}</span>
            </span>
          </span>
        </div>

        <div className="back bl-title back-title">Back</div>
        <div className="lay bl-title lay-title">Lay</div>
      </div>

      {market?.runners?.map((runner) => {
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
                  <div className="text-light">
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
                      {runner.pl ? runner.pl.toFixed(0) : '0'}
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
                      {market?.plForecast[runner?.priority].toFixed(0)}
                    </div>
                  ) : null}
                </div>
              </div>

              {runnerOdds[runner?.priority]?.back
                ?.map((odd, i) => (
                  <button
                    type="button"
                    className={`bl-box back back${odd?.level || i}`}
                    key={`back-${odd?.level || i}`}
                    onClick={() => handleOddClick(runner, odd, betTypes.BACK)}
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
                ))
                .reverse()}

              {runnerOdds[runner?.priority]?.lay?.map((odd, i) => (
                <button
                  type="button"
                  className={`bl-box lay lay${odd?.level || i}`}
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
      })}
    </div>
  );
}

export default MatchOdds;
