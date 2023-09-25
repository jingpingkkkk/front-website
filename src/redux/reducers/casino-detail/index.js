import { createSlice } from '@reduxjs/toolkit';

const casinoSlice = createSlice({
  name: 'casino',

  initialState: {
    liveCasino: [],
    virtualCasino: [],
  },

  reducers: {
    setLiveCasino: (state, action) => {
      state.liveCasino = action.payload;
    },
    setVirtualCasino: (state, action) => {
      state.virtualCasino = action.payload;
    },
  },
});

export const { setLiveCasino, setVirtualCasino } = casinoSlice.actions;

export default casinoSlice.reducer;
