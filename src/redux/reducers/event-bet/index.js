import { createSlice } from '@reduxjs/toolkit';

export const betTypes = {
  BACK: 'back',
  LAY: 'lay',
};

export const orderTypes = {
  LIMIT: 'limit',
  MARKET: 'market',
};

export const orderStatus = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
};

export const eventBetSlice = createSlice({
  name: 'eventBet',

  initialState: {
    /**
     * {
     *    _id: String,
     *    name: String,
     *    betDelay: Number, // in seconds
     *    minStake: Number,
     *    maxStake: Number,
     * }
     */
    market: {},

    /**
     * {
     *    _id: String,
     *    name: String,
     *    price: Number,
     * }
     */
    runner: {},

    price: 0,
    stake: 0,
    betType: '',
    orderType: orderTypes.LIMIT,
  },

  reducers: {
    setBetOdds: (state, action) => {
      state.market = action.payload.market;
      state.runner = action.payload.runner;
      state.price = action.payload.price;
      state.betType = action.payload.betType;
    },

    setBetStake: (state, action) => {
      state.stake = action.payload;
    },

    setBetPrice: (state, action) => {
      state.price = action.payload;
    },

    resetEventBet: (state) => {
      state.market = {};
      state.runner = {};
      state.price = 0;
      state.stake = 0;
      state.betType = '';
      state.orderType = orderTypes.LIMIT;
    },
  },
});

export const { setBetOdds, setBetStake, setBetPrice, resetEventBet } =
  eventBetSlice.actions;

export default eventBetSlice.reducer;
