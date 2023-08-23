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
    market: {},
    runner: {},
    price: 0,
    stake: 0,
    betType: '',
    orderType: orderTypes.LIMIT,
    orderStatus: orderStatus.IDLE,
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

    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },

    resetEventBet: (state) => {
      state.market = {};
      state.price = 0;
      state.stake = 0;
      state.betType = '';
      state.orderType = orderTypes.LIMIT;
      state.orderStatus = orderStatus.IDLE;
    },
  },
});

export const {
  setBetOdds,
  setBetStake,
  setBetPrice,
  setOrderStatus,
  resetEventBet,
} = eventBetSlice.actions;

export default eventBetSlice.reducer;
