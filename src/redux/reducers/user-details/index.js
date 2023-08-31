import { createSlice, current } from '@reduxjs/toolkit';

const userDetailsSlice = createSlice({
  name: 'user',

  initialState: {
    /**
     * {
     *    _id: String,
     *    username: String,
     *    role: String,
     *    fullName: String,
     *    isActive: Boolean,
     *    isBetLock: Boolean,
     *    isClone: Boolean,
     *    isDemo: Boolean,
     *    forcePasswordChange: Boolean,
     *    balance: Number,
     *    exposure: Number,
     * }
     */
    user: {},
  },

  reducers: {
    setUserDetails: (state, action) => {
      const { user } = current(state);
      state.user = { ...user, ...action.payload };
    },
  },
});

export const { setUserDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
