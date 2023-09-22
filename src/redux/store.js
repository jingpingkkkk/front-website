import { configureStore } from '@reduxjs/toolkit';
import eventBetReducer from './reducers/event-bet';
import eventMarketReducer from './reducers/event-market';
import userBetsReducer from './reducers/user-bets';
import userDetailsReducer from './reducers/user-details';
import loginDetailReducer from './reducers/login-popup';
import themeSettingsReducer from './reducers/theme-settings';
import sportsListReducer from './reducers/sports-list';

const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    userBets: userBetsReducer,
    eventBet: eventBetReducer,
    eventMarket: eventMarketReducer,
    loginDetails: loginDetailReducer,
    themeSettings: themeSettingsReducer,
    sportsList: sportsListReducer,
  },
});

export default store;
