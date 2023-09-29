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
     *    apiMarketId: String,
     *    name: String,
     *    betDelay: Number, // in seconds
     *    minStake: Number,
     *    maxStake: Number,
     *    isBetLock: Boolean,
     * }
     */
    market: {},

    /**
     * {
     *    _id: String,
     *    selectionId: Number,
     *    name: String,
     *    price: Number,
     *    pl: Number,
     * }
     */
    runner: {},

    price: 0,
    stake: 0,
    betType: '',
    absoluteBetProfit: 0,
    orderType: orderTypes.LIMIT,
    size: 0,
  },

  reducers: {
    setBetOdds: (state, action) => {
      state.market = action.payload.market;
      state.runner = action.payload.runner;
      state.price = action.payload.price;
      state.betType = action.payload.betType;
      state.size = action.payload.size;
    },

    setBetStake: (state, action) => {
      state.stake = action.payload;
    },

    setBetPrice: (state, action) => {
      state.price = action.payload;
    },

    setBetSize: (state, action) => {
      state.size = action.payload;
    },

    setAbsoluteBetProfit: (state, action) => {
      state.absoluteBetProfit = action.payload;
    },

    resetEventBet: (state) => {
      state.market = {};
      state.runner = {};
      state.price = 0;
      state.stake = 0;
      state.betType = '';
      state.absoluteBetProfit = 0;
      state.orderType = orderTypes.LIMIT;
    },
  },
});

export const {
  setBetOdds,
  setBetStake,
  setBetPrice,
  resetEventBet,
  setAbsoluteBetProfit,
  setBetSize,
} = eventBetSlice.actions;

export default eventBetSlice.reducer;
