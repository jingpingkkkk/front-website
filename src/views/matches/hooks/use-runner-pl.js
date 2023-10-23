import { useDispatch, useSelector } from 'react-redux';
import { betTypes } from '../../../redux/reducers/event-bet';
import { clearOtherMarketForecasts } from '../../../redux/reducers/event-market';
import { MARKET_NAMES } from '../helpers/constants';

export default function useRunnerPl() {
  const dispatch = useDispatch();

  const eventBet = useSelector((state) => state.eventBet);
  const { markets = [] } = useSelector((state) => state.eventMarket);
  const { eventMarketBets = {} } = useSelector((state) => state.userBets);

  const generateMockBet = (params) => {
    const { odds, stake, isBack, runner, potentialWin, potentialLoss } = params;
    const newBet = {
      isBack,
      odds,
      stake,
      potentialWin,
      potentialLoss,
      runnerId: runner._id,
    };
    return newBet;
  };

  const calculateMatchOddsPl = (params) => {
    const { stake, market } = params;
    let { odds } = params;

    if (!(odds && stake && market?.runners?.length)) {
      return {};
    }

    if (market.name === MARKET_NAMES.BOOKMAKER) {
      odds = odds / 100 + 1;
    }

    const potentialWin = params.isBack ? stake * odds - stake : stake;
    const potentialLoss = params.isBack ? -stake : -(stake * odds - stake);

    const mockBet = generateMockBet({
      ...params,
      potentialWin,
      potentialLoss,
    });

    const eventBets = eventMarketBets[market.eventId] || {};
    const marketBets = eventBets[market._id] || [];
    const allBets = [...marketBets, mockBet];

    const runnerMap = new Map();
    market.runners.forEach((runner) =>
      runnerMap.set(runner._id, { _id: runner._id, pl: 0 }),
    );

    allBets.forEach((bet) => {
      const {
        isBack,
        runnerId,
        potentialWin: potWin,
        potentialLoss: potLoss,
      } = bet;

      if (isBack) {
        runnerMap.get(runnerId).pl += potWin;
        runnerMap.forEach((rnr) => {
          if (rnr._id !== runnerId) {
            rnr.pl += potLoss;
          }
        });
      } else {
        runnerMap.get(runnerId).pl += potLoss;
        runnerMap.forEach((rnr) => {
          if (rnr._id !== runnerId) {
            rnr.pl += potWin;
          }
        });
      }
    });

    return Object.fromEntries(runnerMap.entries());
  };

  const processParams = (params) => {
    let {
      odds = null,
      stake = null,
      size = null,
      market = null,
      runner = null,
      betType = null,
    } = params;

    if (stake === null) {
      stake = eventBet.stake;
    }
    if (size === null) {
      size = eventBet.size;
    }
    if (odds === null) {
      odds = eventBet.price;
    }
    if (market === null) {
      market = eventBet.market;
    }
    if (runner === null) {
      runner = eventBet.runner;
    }
    if (betType === null) {
      betType = eventBet.betType;
    }

    market = markets.find((m) => m._id === market._id);

    const isBack = betType.toLowerCase() === betTypes.BACK;
    const payload = { odds, stake, size, market, runner, betType, isBack };

    return payload;
  };

  const calculateRunnerPl = (params) => {
    const payload = processParams(params);
    const { market = {} } = payload;
    if (!market._id) {
      return {};
    }

    dispatch(clearOtherMarketForecasts(market._id));
    if (
      [MARKET_NAMES.MATCH_ODDS, MARKET_NAMES.BOOKMAKER].includes(market.name)
    ) {
      return calculateMatchOddsPl(payload);
    }
    return {};
  };

  const calculateAbsolutePl = (params) => {
    const payload = processParams(params);

    const { market = {}, isBack, stake, size } = payload;
    let { odds } = payload;

    let pl = 0;
    let exposure = 0;

    if (!market._id) {
      return { pl, exposure };
    }

    if (market.name === MARKET_NAMES.BOOKMAKER) {
      odds = odds / 100 + 1;
    }

    if (
      [
        MARKET_NAMES.MATCH_ODDS,
        MARKET_NAMES.BOOKMAKER,
        MARKET_NAMES.FANCY1,
      ].includes(market.name) &&
      odds &&
      stake
    ) {
      if (isBack) {
        pl = stake * odds - stake;
        exposure = -stake;
      } else {
        pl = stake;
        exposure = -(stake * odds - stake);
      }
    }

    if (market.name === MARKET_NAMES.NORMAL && odds && size) {
      if (isBack) {
        pl = (stake * size) / 100;
        exposure = -stake;
      } else {
        pl = stake;
        exposure = -((stake * size) / 100);
      }
    }

    return { pl, exposure };
  };

  return {
    calculateRunnerPl,
    calculateAbsolutePl,
  };
}
