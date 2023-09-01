import { createSlice, current } from '@reduxjs/toolkit';

export const eventMarketSlice = createSlice({
  name: 'eventMarket',

  initialState: {
    /**
     * {
     *    eventId: String,
     *    name: String,
     *    competitionName: String,
     *    startsOn: DateTime,
     * }
     */
    event: {},

    /**
     * [
     *    {
     *      _id: String,
     *      apiMarketId: String,
     *      name: String,
     *      eventName: String,
     *      plForecast: [Number, Number],
     *      minStake: Number,
     *      maxStake: Number,
     *      betDelay: Number, // in seconds
     *      isBetLock: Boolean,
     *      runners: [
     *        {
     *          _id: String,
     *          pl: Number,
     *          selectionId: Number,
     *          name: String,
     *          back: [{ price: Number, size: Number, level: Number }],
     *          lay: [{ price: Number, size: Number, level: Number }],
     *        },
     *        ...
     *      ]
     *    },
     *    ...
     * ]
     */
    markets: [],
  },

  reducers: {
    setEvent: (state, action) => {
      state.event = action.payload;
    },

    setMarkets: (state, action) => {
      state.markets = action.payload;
    },

    setMarketPlForecast: (state, action) => {
      const { marketId, plForecast } = action.payload;
      state.markets = state.markets.map((mkt) => {
        if (mkt._id === marketId) {
          return { ...mkt, plForecast };
        }
        return mkt;
      });
    },

    setMarketRunnerPl: (state, action) => {
      const runnerPls = action.payload;

      runnerPls.forEach((runnerPl) => {
        const { marketId, _id, pl } = runnerPl;
        const currentMarkets = current(state).markets;

        state.markets = currentMarkets.map((mkt) => {
          if (mkt._id === marketId) {
            const runners = mkt.runners.map((runner) => {
              if (runner._id === _id) {
                return { ...runner, pl };
              }
              return runner;
            });
            return { ...mkt, runners };
          }
          return mkt;
        });
      });
    },

    resetEventMarket: (state) => {
      state.event = {};
      state.markets = [];
    },
  },
});

export const {
  setEvent,
  setMarkets,
  setMarketPlForecast,
  resetEventMarket,
  setMarketRunnerPl,
} = eventMarketSlice.actions;

export default eventMarketSlice.reducer;
