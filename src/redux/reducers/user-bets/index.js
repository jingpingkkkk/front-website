import { createSlice } from '@reduxjs/toolkit';

export const userBetsSlice = createSlice({
  name: 'userBets',

  initialState: {
    /**
     * {
     *    [eventId]: {
     *      [marketId]: [
     *        {
     *          market: eventBet.market,
     *          runner: eventBet.runner,
     *          bet: {
     *            _id: String,
     *            result: String, // 'running' | 'won' | 'lost' | 'void' | 'cash_out'
     *            odds: Number,
     *            stake: Number,
     *            isBack: Boolean,
     *            createdAt: DateTime,
     *          }
     *        },
     *      ],
     *    },
     * }
     */
    eventMarketBets: {},
  },

  reducers: {
    addUserBet: (state, action) => {
      const { eventId, market, runner, bet } = action.payload;
      const currentEventMarket = state.eventMarketBets[eventId] || [];

      if (currentEventMarket.length > 0) {
        const currentMarketBets = currentEventMarket[market._id] || [];
        state.eventMarketBets[eventId][market._id] = [
          { market, runner, bet },
          ...currentMarketBets,
        ];
      } else {
        state.eventMarketBets[eventId] = {
          [market._id]: [{ market, runner, bet }],
        };
      }
    },
  },
});

export const { addUserBet } = userBetsSlice.actions;

export default userBetsSlice.reducer;
