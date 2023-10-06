/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import { io } from 'socket.io-client';
import shortNumber from '../../../../helper/number';
import { betTypes, setBetOdds } from '../../../../redux/reducers/event-bet';
import { setMarketPlForecast } from '../../../../redux/reducers/event-market';

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const marketUrl = `${socketUrl}/market`;

function Fancy({ market }) {
  const socket = useMemo(() => io(marketUrl, { autoConnect: false }), []);

  const dispatch = useDispatch();

  const previousValue = useRef([]);

  const [fancyRunners, setFancyRunners] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFancyData = (data) => {
    if (data.length) {
      const fancyPrevData = previousValue.current;
      const teamData = data.map((item) => {
        const currentItem = { ...item };
        currentItem.back = {
          price: item.BackPrice1,
          size: item.BackSize1,
          class: '',
        };
        currentItem.lay = {
          price: item.LayPrice1,
          size: item.LaySize1,
          class: '',
        };
        currentItem.pl =
          market.runners.find((runner) => runner._id === item.runnerId)?.pl ||
          0;
        if (fancyPrevData?.length) {
          const prevRunnerOdds = fancyPrevData.find(
            (fancy) => fancy.runnerId === item.runnerId,
          );
          const runnerOdds = data.find(
            (fancy) => fancy.runnerId === item.runnerId,
          );
          if (prevRunnerOdds && runnerOdds) {
            currentItem.back.class =
              runnerOdds.BackPrice1 > prevRunnerOdds?.back?.price
                ? 'odds-up'
                : runnerOdds.BackPrice1 < prevRunnerOdds?.back?.price
                ? 'odds-down'
                : '';
            currentItem.lay.class =
              runnerOdds.LayPrice1 > prevRunnerOdds?.lay?.price
                ? 'odds-up'
                : runnerOdds.LayPrice1 < prevRunnerOdds?.lay?.price
                ? 'odds-down'
                : '';
          }
        }
        return currentItem;
      });
      setFancyRunners(teamData);
      previousValue.current = teamData;
    }
    setLoading(false);
  };

  useEffect(() => {
    socket.emit(
      'join:market',
      { id: market.apiEventId, type: 'fancy' },
      handleFancyData,
    );
    socket.on(`market:data:${market.apiEventId}`, handleFancyData);
    socket.connect();
    return () => {
      socket.off(`market:data:${market.apiEventId}`);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market]);

  const handleOddClick = (runner, price, size, type) => {
    if (price === 0) return;
    const selectedOdd = {
      market: {
        _id: market._id,
        apiMarketId: market.apiMarketId,
        name: market.name,
        betDelay: 0,
        minStake: market.minStake,
        maxStake: market.maxStake,
        isBetLock: market.isBetLock || false,
      },
      runner: {
        _id: runner.runnerId,
        selectionId: runner.SelectionId,
        name: runner.RunnerName,
        priority: 0,
        pl: 0,
      },
      price,
      size,
      betType: type,
    };
    // dispatch(setBetStake(0));
    dispatch(setBetOdds(selectedOdd));
    dispatch(setMarketPlForecast({ marketId: market._id, plForecast: [0, 0] }));
  };

  return (
    <div className="pb-1">
      <div className="row row5 d-none-mobile">
        <div className="col-12 col-md-6">
          <div className="fancy-tripple">
            <div className="bet-table-row">
              <div className="nation-name" />
              <div className="lay bl-title lay-title">No</div>
              <div className="back bl-title back-title">Yes</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="fancy-tripple">
            <div className="bet-table-row">
              <div className="nation-name" />
              <div className="lay bl-title lay-title">No</div>
              <div className="back bl-title back-title">Yes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row row5">
        {loading ? (
          <div className="col-md-12 text-center mt-2">
            <Spinner className="text-primary" />
          </div>
        ) : fancyRunners?.length ? (
          fancyRunners?.map((runner) => {
            return (
              <div key={runner?.RunnerName} className="col-12 col-md-6">
                <div className="fancy-tripple">
                  <div className="bet-table-mobile-row d-none-desktop">
                    <div className="bet-table-mobile-team-name">
                      <span>{runner?.RunnerName || ''}</span>
                    </div>
                  </div>
                  <div
                    data-title={runner?.GameStatus}
                    className={`bet-table-row ${
                      runner?.GameStatus === 'SUSPENDED' ? 'suspendedtext' : ''
                    }${
                      runner?.GameStatus === 'Ball Running'
                        ? 'suspendedtext'
                        : ''
                    }`}
                  >
                    <div className="nation-name d-none-mobile small">
                      <div>
                        <span>{runner?.RunnerName || ''}</span>
                        <div
                          className={`pt-1 small ${
                            runner?.pl > 0
                              ? 'text-success'
                              : runner?.pl < 0
                              ? 'text-danger'
                              : 'text-light'
                          }`}
                        >
                          {runner?.pl ? runner?.pl?.toFixed(0) : ''}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`bl-box lay lay ${runner?.lay?.class}`}
                      onClick={() =>
                        handleOddClick(
                          runner,
                          runner?.lay?.price,
                          runner?.lay?.size,
                          betTypes.LAY,
                        )
                      }
                    >
                      {runner?.lay?.price && runner?.lay?.price !== 0 ? (
                        <>
                          <span className="d-block odds">
                            {runner?.lay?.price
                              ? parseFloat(runner?.lay?.price.toFixed(2))
                              : '-'}
                          </span>
                          <span className="d-block">
                            {runner?.lay?.size
                              ? shortNumber(runner?.lay?.size, 2)
                              : 0}
                          </span>
                        </>
                      ) : (
                        <span>-</span>
                      )}
                    </button>
                    <button
                      type="button"
                      className={`bl-box back back ${runner?.back?.class}`}
                      onClick={() =>
                        handleOddClick(
                          runner,
                          runner?.back?.price,
                          runner?.back?.size,
                          betTypes.BACK,
                        )
                      }
                    >
                      {runner?.back?.price && runner?.back?.price !== 0 ? (
                        <>
                          <span className="d-block odds">
                            {runner?.back?.price
                              ? parseFloat(runner?.back?.price?.toFixed(2))
                              : '-'}
                          </span>
                          <span className="d-block">
                            {runner?.back?.size
                              ? shortNumber(runner.back?.size, 2)
                              : 0}
                          </span>
                        </>
                      ) : (
                        <span>-</span>
                      )}
                    </button>
                    <div className="fancy-min-max">
                      <div>
                        <span title={`Min:${shortNumber(runner.min, 0)}`}>
                          Min:<span>{shortNumber(runner.min, 0)}</span>
                        </span>
                      </div>
                      <div>
                        <span
                          className="ps-2"
                          title={`Max:${shortNumber(runner.max, 0)}`}
                        >
                          Max:<span>{shortNumber(runner.max, 0)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {runner?.LayPrice2 &&
                  runner?.LayPrice2 !== 0 &&
                  runner?.BackPrice2 &&
                  runner?.BackPrice2 !== 0 ? (
                    <div
                      data-title={runner?.GameStatus}
                      className={`bet-table-row ${
                        runner?.GameStatus === 'SUSPENDED'
                          ? 'suspendedtext'
                          : ''
                      }${
                        runner?.GameStatus === 'Ball Running'
                          ? 'suspendedtext'
                          : ''
                      }`}
                    >
                      <div className="nation-name d-none-mobile small" />
                      <button
                        type="button"
                        className="bl-box lay lay"
                        onClick={() =>
                          handleOddClick(
                            runner,
                            runner?.LayPrice2,
                            runner?.LaySize2,
                            betTypes.LAY,
                          )
                        }
                      >
                        {runner?.LayPrice2 && runner?.LayPrice2 !== 0 ? (
                          <>
                            <span className="d-block odds">
                              {runner?.LayPrice2 && runner?.LayPrice2
                                ? parseFloat(
                                    runner?.LayPrice2 &&
                                      runner?.LayPrice2.toFixed(2),
                                  )
                                : '-'}
                            </span>
                            <span className="d-block">
                              {runner?.LaySize2
                                ? shortNumber(runner?.LaySize2, 2)
                                : 0}
                            </span>
                          </>
                        ) : (
                          <span>-</span>
                        )}
                      </button>
                      <button
                        type="button"
                        className="bl-box back back"
                        onClick={() =>
                          handleOddClick(
                            runner,
                            runner?.BackPrice2,
                            runner?.BackSize2,
                            betTypes.BACK,
                          )
                        }
                      >
                        {runner?.BackPrice2 && runner?.BackPrice2 !== 0 ? (
                          <>
                            <span className="d-block odds">
                              {runner?.BackPrice2
                                ? parseFloat(runner?.BackPrice2?.toFixed(2))
                                : '-'}
                            </span>
                            <span className="d-block">
                              {runner?.BackSize2
                                ? shortNumber(runner?.BackSize2, 2)
                                : 0}
                            </span>
                          </>
                        ) : (
                          <span>-</span>
                        )}
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                  {runner?.LayPrice3 &&
                  runner?.LayPrice3 !== 0 &&
                  runner?.BackPrice3 &&
                  runner?.BackPrice3 !== 0 ? (
                    <div
                      data-title={runner?.GameStatus}
                      className={`bet-table-row ${
                        runner?.GameStatus === 'SUSPENDED'
                          ? 'suspendedtext'
                          : ''
                      }${
                        runner?.GameStatus === 'Ball Running'
                          ? 'suspendedtext'
                          : ''
                      }`}
                    >
                      <div className="nation-name d-none-mobile small" />
                      <button
                        type="button"
                        className="bl-box lay lay"
                        onClick={() =>
                          handleOddClick(
                            runner,
                            runner?.LayPrice3,
                            runner?.LaySize3,
                            betTypes.LAY,
                          )
                        }
                      >
                        {runner?.LayPrice3 && runner?.LayPrice3 !== 0 ? (
                          <>
                            <span className="d-block odds">
                              {runner?.LayPrice3 && runner?.LayPrice3
                                ? parseFloat(
                                    runner?.LayPrice3 &&
                                      runner?.LayPrice3.toFixed(2),
                                  )
                                : '-'}
                            </span>
                            <span className="d-block">
                              {runner?.LaySize3
                                ? shortNumber(runner?.LaySize3, 2)
                                : 0}
                            </span>
                          </>
                        ) : (
                          <span>-</span>
                        )}
                      </button>
                      <button
                        type="button"
                        className="bl-box back back"
                        onClick={() =>
                          handleOddClick(
                            runner,
                            runner?.BackPrice3,
                            runner?.BackSize3,
                            betTypes.BACK,
                          )
                        }
                      >
                        {runner?.BackPrice3 && runner?.BackPrice3 !== 0 ? (
                          <>
                            <span className="d-block odds">
                              {runner?.BackPrice3
                                ? parseFloat(runner?.BackPrice3?.toFixed(2))
                                : '-'}
                            </span>
                            <span className="d-block">
                              {runner?.BackSize3
                                ? shortNumber(runner?.BackSize3, 2)
                                : 0}
                            </span>
                          </>
                        ) : (
                          <span>-</span>
                        )}
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-primary text-center">No Data</div>
        )}
      </div>
    </div>
  );
}

export default Fancy;
