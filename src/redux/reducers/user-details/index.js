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

    /**
     * {
     *    id: String,
     *    stakeType: String, 'games' | 'casino'
     *    inputValues: [
     *     {
     *        id: String,
     *        priceLabel: Number,
     *        priceValue: Number,
     *     }
     *    ],
     * }
     */
    gameButtons: {},

    /**
     * {
     *    id: String,
     *    stakeType: String, 'games' | 'casino'
     *    inputValues: [
     *     {
     *        id: String,
     *        priceLabel: Number,
     *        priceValue: Number,
     *     }
     *    ],
     * }
     */
    casinoButtons: {},
  },

  reducers: {
    setUserDetails: (state, action) => {
      const { user } = current(state);
      state.user = { ...user, ...action.payload };
    },

    setStakeButtons: (state, action) => {
      state.gameButtons = action.payload.gameButtons;
      state.casinoButtons = action.payload.casinoButtons;
    },
  },
});

export const { setUserDetails, setStakeButtons } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
