import React, { Suspense } from 'react';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const LiveMatchPageContent = React.lazy(() => import('./ui/page-content'));
const ExchangeSideMenu = React.lazy(() =>
  import('../../components/common/exchange-sidemenu'),
);
const ProductPromotion = React.lazy(() =>
  import('../../components/common/suggestions'),
);

function LiveMatchPage() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout
        sidebarLeft={<ExchangeSideMenu />}
        pageContent={<LiveMatchPageContent />}
        sidebarRight={<ProductPromotion />}
      />
    </Suspense>
  );
}

export default LiveMatchPage;
