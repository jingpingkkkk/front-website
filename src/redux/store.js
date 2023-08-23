import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducers';
import eventBetReducer from './reducers/event-bet';
import eventMarketReducer from './reducers/event-market';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
    eventBet: eventBetReducer,
    eventMarket: eventMarketReducer,
  },
});

export default store;
