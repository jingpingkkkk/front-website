import { createSlice } from '@reduxjs/toolkit';

export const eventMarketSlice = createSlice({
  name: 'eventMarket',

  initialState: {
    /**
     * {
     *    eventId: String,
     *    name: String,
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
     *      runners: [
     *        {
     *          _id: String,
     *          name: String,
     *          back: [{ price: Number, size: Number, level: Number }],
     *          lay: [{ price: Number, size: Number, level: Number }],
     *        }
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

    resetEventMarket: (state) => {
      state.event = {};
      state.markets = [];
    },
  },
});

export const { setEvent, setMarkets, setMarketPlForecast, resetEventMarket } =
  eventMarketSlice.actions;

export default eventMarketSlice.reducer;
