import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';
import { getRequest } from '../../api';
import { setSportsList } from '../../redux/reducers/sports-list';

const ExchangeSideMenu = React.lazy(() =>
  import('../../components/common/exchange-sidemenu'),
);
const MatchPageContent = React.lazy(() => import('./ui/page-content'));
const BetSlip = React.lazy(() => import('./ui/bet-slip'));

function Matches() {
  const dispatch = useDispatch();
  const getAllSports = async () => {
    try {
      const result = await getRequest('exchangeHome/sportsList', false);
      if (result?.success) {
        dispatch(setSportsList(result?.data || []));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
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
