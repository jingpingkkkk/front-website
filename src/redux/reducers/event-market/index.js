import { createSlice } from '@reduxjs/toolkit';

export const eventMarketSlice = createSlice({
  name: 'eventMarket',

  initialState: {
    event: {},
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
