import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import dataReducer from './reducers';

const store = configureStore({
  reducer: {
    user: userReducer,
    data: dataReducer,
  },
});

export default store;
