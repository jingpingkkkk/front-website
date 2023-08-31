import { configureStore } from '@reduxjs/toolkit';
import eventBetReducer from './reducers/event-bet';
import eventMarketReducer from './reducers/event-market';
import userBetsReducer from './reducers/user-bets';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    userBets: userBetsReducer,
    eventBet: eventBetReducer,
    eventMarket: eventMarketReducer,
  },
});

export default store;
