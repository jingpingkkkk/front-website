import { configureStore } from '@reduxjs/toolkit';
import eventBetReducer from './reducers/event-bet';
import eventMarketReducer from './reducers/event-market';
import userBetsReducer from './reducers/user-bets';
import userDetailsReducer from './reducers/user-details';

const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    userBets: userBetsReducer,
    eventBet: eventBetReducer,
    eventMarket: eventMarketReducer,
  },
});

export default store;
