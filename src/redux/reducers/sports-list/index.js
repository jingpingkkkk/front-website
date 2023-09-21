import { createSlice } from '@reduxjs/toolkit';

const sportsListSlice = createSlice({
  name: 'sports',

  initialState: {
    sports: {},
  },

  reducers: {
    setSportsList: (state, action) => {
      state.sports = action.payload;
    },
  },
});

export const { setSportsList } = sportsListSlice.actions;

export default sportsListSlice.reducer;
