import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const ExchangeSideMenu = React.lazy(() =>
  import('../../components/common/exchange-sidemenu'),
);
const MatchPageContent = React.lazy(() => import('./ui/page-content'));
const BetSlip = React.lazy(() => import('./ui/bet-slip'));
const ProductPromotion = React.lazy(() =>
  import('../../components/common/suggestions'),
);

function Matches() {
  const userDetails = useSelector((state) => state.userDetails);
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout
        sidebarLeft={<ExchangeSideMenu />}
        pageContent={<MatchPageContent />}
        sidebarRight={
          !userDetails?.user?._id || !localStorage.getItem('userToken') ? (
            <ProductPromotion />
          ) : (
            <BetSlip />
          )
        }
      />
    </Suspense>
  );
}

export default Matches;
