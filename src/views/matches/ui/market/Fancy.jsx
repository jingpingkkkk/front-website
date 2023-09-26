/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Spinner } from 'reactstrap';
import { postRequest } from '../../../../api';
import shortNumber from '../../../../helper/number';
import { betTypes, setBetOdds } from '../../../../redux/reducers/event-bet';
import {
  setMarketPlForecast,
  setMarketRunnerPl,
} from '../../../../redux/reducers/event-market';

const emptyOdds = {
  back: { price: 0, size: 0 },
  lay: { price: 0, size: 0 },
};

const socketUrl = import.meta.env.VITE_SOCKET_URL;
const marketUrl = `${socketUrl}/market`;

function Fancy({ market }) {
  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.eventMarket);
  const { market: eventBetMarket } = useSelector((state) => state.eventBet);
  const socket = useMemo(() => io(marketUrl, { autoConnect: false }), []);
  const [fancyRunners, setFancyRunners] = useState([]);

  const [runnerOdds, setRunnerOdds] = useState(emptyOdds);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    socket.on('connect', () => {
      socket.emit('join:market', {
        id: market.apiEventId,
        type: 'fancy',
      });
    });

    socket.on(`market:data:${market.apiEventId}`, (data) => {
      if (Object.keys(data).length > 0) {
        setLoading(false);
        const teamData = data?.map((item) => ({
          runnerId: item?.runnerId,
          back: { price: item.BackPrice1, size: item.BackSize1 },
          lay: { price: item.LayPrice1, size: item.LaySize1 },
        }));
        setRunnerOdds(teamData);
        setFancyRunners(data);
      } else {
        setLoading(false);
      }
    });

    socket.connect();

    return () => {
      socket.off('connect');
      socket.off(`market:data:${market.apiEventId}`);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market]);

  const handleOddClick = (runner, price, type) => {
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
        priority: runner.priority,
        pl: runner.pl,
      },
      price,
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
            <Spinner className="text-dark" />
          </div>
        ) : null}
        {fancyRunners?.map((runner) => {
          const odds = runnerOdds?.length
            ? runnerOdds?.find((item) => item?.runnerId === runner?.runnerId)
            : {};
          return (
            <div key={runner?.runnerId} className="col-12 col-md-6">
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
                    runner?.GameStatus === 'Ball Running' ? 'suspendedtext' : ''
                  }`}
                >
                  <div className="nation-name d-none-mobile small">
                    <div>
                      <span>{runner?.RunnerName || ''}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bl-box lay lay"
                    onClick={() =>
                      handleOddClick(runner, odds?.lay?.price, betTypes.LAY)
                    }
                  >
                    {odds?.lay?.price && odds?.lay?.price !== 0 ? (
                      <>
                        <span className="d-block odds">
                          {odds?.lay?.price
                            ? parseFloat(odds?.lay?.price.toFixed(2))
                            : '-'}
                        </span>
                        <span className="d-block">
                          {odds?.lay?.size
                            ? shortNumber(odds?.lay?.size, 2)
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
                      handleOddClick(runner, odds?.back?.price, betTypes.BACK)
                    }
                  >
                    {odds?.back?.price && odds?.back?.price !== 0 ? (
                      <>
                        <span className="d-block odds">
                          {odds?.back?.price
                            ? parseFloat(odds?.back?.price?.toFixed(2))
                            : '-'}
                        </span>
                        <span className="d-block">
                          {odds?.back?.size
                            ? shortNumber(odds.back?.size, 2)
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
                      runner?.GameStatus === 'SUSPENDED' ? 'suspendedtext' : ''
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
                        handleOddClick(runner, runner?.LayPrice2, betTypes.LAY)
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
                      runner?.GameStatus === 'SUSPENDED' ? 'suspendedtext' : ''
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
                        handleOddClick(runner, runner?.LayPrice3, betTypes.LAY)
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
        })}
      </div>
    </div>
  );
}

export default Fancy;
