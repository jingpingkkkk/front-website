/* eslint-disable no-nested-ternary */
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import { io } from 'socket.io-client';
import shortNumber from '../../../../helper/number';
import { betTypes, setBetOdds } from '../../../../redux/reducers/event-bet';
import { setMarketPlForecast } from '../../../../redux/reducers/event-market';

const singleOdd = {
  back: [
    { price: 0, level: 0, class: '' },
    { price: 0, level: 1, class: '' },
    { price: 0, level: 2, class: '' },
  ],
  lay: [
    { price: 0, level: 0, class: '' },
    { price: 0, level: 1, class: '' },
    { price: 0, level: 2, class: '' },
  ],
  status: '',
};

const emptyOdds = {
  0: singleOdd,
  1: singleOdd,
  2: singleOdd,
};

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const marketUrl = `${socketUrl}/market`;

const colors = [
  '#f00',
  '#00f',
  '#075ba6',
  '#837200',
  '#c29900',
  '#72bbef',
  '#f994ba',
];

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
      const runners = data.matchOdds.reduce((acc, runner, index) => {
        const runnerBack = runner.back.length
          ? runner.back
          : Array(3).fill(singleOdd);
        const runnerLay = runner.lay.length
          ? runner.lay
          : Array(3).fill(singleOdd);

        const { back: previousBack, lay: previousLay } =
          previousValue?.current?.[index] || {};

        acc[index] = {
          ...runner,
          back: runnerBack.map((odd) => ({
            ...odd,
            class:
              odd.price > previousBack?.[odd.level]?.price
                ? 'odds-up'
                : odd.price < previousBack?.[odd.level]?.price
                ? 'odds-down'
                : '',
          })),
          lay: runnerLay.map((odd) => ({
            ...odd,
            class:
              odd.price > previousLay?.[odd.level]?.price
                ? 'odds-up'
                : odd.price < previousLay?.[odd.level]?.price
                ? 'odds-down'
                : '',
          })),
        };
        return acc;
      }, {});

      setMin(data.min);
      setMax(data.max);
      setRunnerOdds(runners);
      previousValue.current = runners;
    }
    setLoading(false);
  };

  useLayoutEffect(() => {
    for (let i = 0; i < market?.runners?.length; i += 1) {
      emptyOdds[i] = singleOdd;
    }
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
  }, [market, emptyOdds]);

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
        market?.runners?.map((runner, index) => {
          const runnernames = runner?.name.split(/\s*\.\s*/);
          const number = runnernames[0];
          const runnername = runnernames[1];
          return (
            <div key={runner?.name}>
              <div className="bet-table-mobile-row d-none-desktop">
                <div className="bet-table-mobile-team-name">
                  {/* <span>{runner?.name || ''}</span> */}
                  {market?.sportsName === 'Greyhound Racing' ? (
                    <div className="d-flex">
                      <span
                        className="badge runner-number"
                        style={{
                          backgroundColor: colors[index] || colors[0],
                        }}
                      >
                        {number}
                      </span>
                      <span className="ms-2">{runnername || ''}</span>
                    </div>
                  ) : (
                    <span>{runner?.name || ''}</span>
                  )}
                </div>
              </div>

              <div
                className={`bet-table-row ${
                  runnerOdds[runner?.priority]?.status === 'SUSPENDED'
                    ? 'suspendedtext'
                    : ''
                } ${
                  runnerOdds[runner?.priority]?.status === 'Ball Running'
                    ? 'suspendedtext'
                    : ''
                }`}
                data-title={runnerOdds[runner?.priority]?.status || ''}
              >
                <div className="nation-name d-none-mobile">
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <div>
                      {market?.sportsName === 'Greyhound Racing' ? (
                        <div className="d-flex">
                          <span
                            className="badge runner-number"
                            style={{
                              backgroundColor: colors[index] || colors[0],
                            }}
                          >
                            {number}
                          </span>
                          <span className="ms-2">{runnername || ''}</span>
                        </div>
                      ) : (
                        <span>{runner?.name || ''}</span>
                      )}
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
