import { createSlice } from '@reduxjs/toolkit';

const casinoSlice = createSlice({
  name: 'casino',

  initialState: {
    liveCasino: [],
    virtualCasino: [],
    allCasino: [],
    casinoListLoading: false,
  },

  reducers: {
    setLiveCasino: (state, action) => {
      state.liveCasino = action.payload;
    },
    setVirtualCasino: (state, action) => {
      state.virtualCasino = action.payload;
    },
    setAllCasino: (state, action) => {
      state.allCasino = action.payload;
    },
    setCasinoListLoading: (state, action) => {
      state.casinoListLoading = action.payload;
    },
  },
});

export const {
  setLiveCasino,
  setVirtualCasino,
  setAllCasino,
  setCasinoListLoading,
} = casinoSlice.actions;

export default casinoSlice.reducer;
