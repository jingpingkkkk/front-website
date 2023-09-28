import { createSlice } from '@reduxjs/toolkit';

const sportsListSlice = createSlice({
  name: 'sports',

  initialState: {
    sports: [],
    loading: false,
  },

  reducers: {
    setSportsList: (state, action) => {
      state.sports = action.payload;
    },
    setSportsLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setSportsList, setSportsLoader } = sportsListSlice.actions;

export default sportsListSlice.reducer;
