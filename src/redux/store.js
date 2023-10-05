import { configureStore } from '@reduxjs/toolkit';
import casinoReducer from './reducers/casino-detail';
import eventBetReducer from './reducers/event-bet';
import eventMarketReducer from './reducers/event-market';
import loginDetailReducer from './reducers/login-popup';
import sportsListReducer from './reducers/sports-list';
import themeSettingsReducer from './reducers/theme-settings';
import userBetsReducer from './reducers/user-bets';
import userDetailsReducer from './reducers/user-details';

const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    userBets: userBetsReducer,
    eventBet: eventBetReducer,
    eventMarket: eventMarketReducer,
    loginDetails: loginDetailReducer,
    themeSettings: themeSettingsReducer,
    sportsList: sportsListReducer,
    casino: casinoReducer,
  },
  devTools: import.meta.env.VITE_ENV !== 'production',
});

export default store;
