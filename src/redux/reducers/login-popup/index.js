import { createSlice } from '@reduxjs/toolkit';

const loginPopupSlice = createSlice({
  name: 'loginPopup',

  initialState: {
    isLogingOpen: false,
  },

  reducers: {
    setLoginPopup: (state, action) => {
      state.isLogingOpen = action.payload;
    },
  },
});

export const { setLoginPopup } = loginPopupSlice.actions;

export default loginPopupSlice.reducer;
