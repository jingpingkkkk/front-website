import { createSlice } from '@reduxjs/toolkit';

const sportsListSlice = createSlice({
  name: 'sports',

  initialState: {
    allSports: [],
    sports: [], // will be used for filtering
    favouriteEvents: [],
    loading: false,
    liveEventsCount: 0,
    upComingEventsCount: 0,
    totalEventsCount: 0,
    favouriteEventsCount: 0,
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
    setLiveEventsCount: (state, action) => {
      state.liveEventsCount = action.payload;
    },
    setUpComingEventsCount: (state, action) => {
      state.upComingEventsCount = action.payload;
    },
    setTotalEventsCount: (state, action) => {
      state.totalEventsCount = action.payload;
    },
    setFavouriteEventsCount: (state, action) => {
      state.favouriteEventsCount = action.payload;
    },
  },
});

export const {
  setSportsList,
  setSportsLoader,
  setFilteredSports,
  setFavouriteEvents,
  setLiveEventsCount,
  setUpComingEventsCount,
  setTotalEventsCount,
  setFavouriteEventsCount,
} = sportsListSlice.actions;

export default sportsListSlice.reducer;
