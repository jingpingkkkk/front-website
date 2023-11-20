import React, { Suspense } from 'react';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const CasinoDetailPageContent = React.lazy(() => import('./ui/page-content'));
const ExchangeSideMenu = React.lazy(() =>
  import('../../components/common/exchange-sidemenu'),
);
const CasinoLastResult = React.lazy(() => import('./ui/casino-result'));

function CasinoDetailPage() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout
        sidebarLeft={<ExchangeSideMenu />}
        pageContent={<CasinoDetailPageContent />}
        sidebarRight={<CasinoLastResult />}
      />
    </Suspense>
  );
}

export default CasinoDetailPage;
