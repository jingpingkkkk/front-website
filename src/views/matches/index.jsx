import React, { Suspense } from 'react';
import AppLayout from '../../components/core/app-layout';
import LoadingOverlay from '../../components/core/loading-overlay';

const ExchangeSideMenu = React.lazy(() =>
  import('../../components/common/exchange-sidemenu'),
);
const MatchPageContent = React.lazy(() => import('./ui/page-content'));
const BetSlip = React.lazy(() => import('./ui/bet-slip'));

function Matches() {
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
