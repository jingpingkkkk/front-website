import React, { Suspense } from 'react';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const ExchangeSideMenu = React.lazy(() =>
  import('../../components/common/exchange-sidemenu'),
);
const SportPageContent = React.lazy(() => import('./ui/page-content'));
const ProductPromotion = React.lazy(() => import('./ui/suggestions'));

function Sports() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout
        sidebarLeft={<ExchangeSideMenu />}
        pageContent={<SportPageContent />}
        sidebarRight={<ProductPromotion />}
      />
    </Suspense>
  );
}

export default Sports;
