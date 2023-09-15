/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { postRequest } from '../../../../api';
import shortNumber from '../../../../helper/number';
import { betTypes } from '../../../../redux/reducers/event-bet';
import { setMarketRunnerPl } from '../../../../redux/reducers/event-market';

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
  // console.log('market', market);

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
        id: market.apiEventId,
        type: 'fancy',
      });
    });

    socket.on(`market:data:${market.apiEventId}`, (data) => {
      // console.log('Data=>', data);
      if (data) {
        // const { BackPrice1, LayPrice1, BackSize1, LaySize1 } = data;

        const teamData = { back: {}, lay: {} };

        // teamData.back.price = BackPrice1;
        // teamData.back.size = BackSize1;
        // teamData.lay.price = LayPrice1;
        // teamData.lay.size = LaySize1;
        setRunnerOdds(teamData);
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

  const handleOddClick = (runner, odd, type) => {
    console.log(runner, odd, type);
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
        {market?.runners?.map((runner) => {
          return (
            <div key={runner?._id} className="col-12 col-md-6">
              <div className="fancy-tripple">
                <div className="bet-table-mobile-row d-none-desktop">
                  <div className="bet-table-mobile-team-name">
                    <span>{runner?.name || ''}</span>
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
                </div>
                <div data-title="" className="bet-table-row">
                  <div className="nation-name d-none-mobile small">
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
                        {runner.pl ? runner.pl.toFixed(0) : ''}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="bl-box lay lay"
                    onClick={() =>
                      handleOddClick(runner, runnerOdds, betTypes.LAY)
                    }
                  >
                    {runnerOdds?.lay?.price && runnerOdds?.lay?.price !== 0 ? (
                      <>
                        <span className="d-block odds">
                          {runnerOdds?.lay?.price
                            ? parseFloat(runnerOdds?.lay?.price.toFixed(2))
                            : '-'}
                        </span>
                        <span className="d-block">
                          {runnerOdds?.lay?.size
                            ? shortNumber(runnerOdds?.lay?.size, 2)
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
                      handleOddClick(runner, runnerOdds, betTypes.BACK)
                    }
                  >
                    {runnerOdds?.back?.price && runnerOdds.back.price !== 0 ? (
                      <>
                        <span className="d-block odds">
                          {runnerOdds?.back?.price
                            ? parseFloat(runnerOdds.back?.price.toFixed(2))
                            : '-'}
                        </span>
                        <span className="d-block">
                          {runnerOdds?.back?.size
                            ? shortNumber(runnerOdds.back?.size, 2)
                            : 0}
                        </span>
                      </>
                    ) : (
                      <span>-</span>
                    )}
                  </button>
                  <div className="fancy-min-max">
                    <div>
                      <span title={`Min:${shortNumber(runner.minStake)}`}>
                        Min:<span>{shortNumber(runner.minStake)}</span>
                      </span>
                    </div>
                    <div>
                      <span
                        className="ps-2"
                        title={`Max:${shortNumber(runner.maxStake)}`}
                      >
                        Max:<span>{shortNumber(runner.maxStake)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Fancy;
