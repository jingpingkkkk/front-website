import { createSlice, current } from '@reduxjs/toolkit';

export const userBetsSlice = createSlice({
  name: 'userBets',

  initialState: {
    /**
     * {
     *    [eventId]: {
     *      [marketId]: [
     *        {
     *          marketName: String,
     *          runnerName: String,
     *          odds: Number,
     *          stake: Number,
     *          isBack: Boolean,
     *          createdAt: DateTime,
     *        },
     *      ],
     *    },
     * }
     */
    eventMarketBets: {},
  },

  reducers: {
    addEventMarketBets: (state, action) => {
      const { eventId, marketBets } = action.payload;

      const betsByMarket = {};

      marketBets.forEach(({ market, bets }) => {
        betsByMarket[market._id] = bets.map((bet) => ({
          _id: bet._id,
          marketName: market.name,
          runnerName: bet.runner,
          odds: bet.odds,
          stake: bet.stake,
          isBack: bet.isBack,
          createdAt: bet.createdAt,
        }));
      });

      state.eventMarketBets[eventId] = betsByMarket;
    },

    addUserBet: (state, action) => {
      const { betDetails, eventBet } = action.payload;
      const { eventId, marketId } = betDetails;

      const { eventMarketBets } = current(state);
      const currentEventMarket = eventMarketBets[eventId] || {};

      const betObj = {
        _id: betDetails._id,
        marketName: eventBet.market.name,
        runnerName: eventBet.runner.name,
        odds: betDetails.odds,
        stake: betDetails.stake,
        isBack: betDetails.isBack,
        createdAt: betDetails.createdAt,
      };

      if (currentEventMarket) {
        const currentMarketBets = currentEventMarket[marketId] || [];
        state.eventMarketBets[eventId][marketId] = [
          betObj,
          ...currentMarketBets,
        ];
      } else {
        state.eventMarketBets[eventId] = {
          [marketId]: [betObj],
        };
      }
    },
  },
});

export const { addUserBet, addEventMarketBets } = userBetsSlice.actions;

export default userBetsSlice.reducer;
