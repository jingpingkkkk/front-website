import { createSlice } from '@reduxjs/toolkit';

const sportsListSlice = createSlice({
  name: 'sports',

  initialState: {
    allSports: [],
    sports: [], // will be used for filtering
    favouriteEvents: [],
    loading: false,
  },

  reducers: {
    setSportsList: (state, action) => {
      state.allSports = action.payload;
      state.sports = action.payload;
    },

    setSportsLoader: (state, action) => {
      state.loading = action.payload;
    },

    setFilteredSports: (state, action) => {
      state.sports = action.payload;
    },

    setFavouriteEvents: (state, action) => {
      state.favouriteEvents = action.payload;
    },
  },
});

export const {
  setSportsList,
  setSportsLoader,
  setFilteredSports,
  setFavouriteEvents,
} = sportsListSlice.actions;

export default sportsListSlice.reducer;
