import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRequest } from '../../api';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';
import {
  setSportsList,
  setSportsLoader,
} from '../../redux/reducers/sports-list';

const ExchangeSideMenu = React.lazy(() =>
  import('../../components/common/exchange-sidemenu'),
);
const MatchPageContent = React.lazy(() => import('./ui/page-content'));
const BetSlip = React.lazy(() => import('./ui/bet-slip'));

function Matches() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllSports = async () => {
      try {
        dispatch(setSportsLoader(true));
        const result = await getRequest('exchangeHome/sportsList', false);
        if (result?.success) {
          dispatch(setSportsList(result?.data || []));
        }
        dispatch(setSportsLoader(false));
      } catch (error) {
        dispatch(setSportsLoader(false));
        console.log(error);
      }
    };
    getAllSports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout
        sidebarLeft={<ExchangeSideMenu />}
        pageContent={<MatchPageContent />}
        sidebarRight={<BetSlip />}
      />
    </Suspense>
  );
}

export default Matches;
