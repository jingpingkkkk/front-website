import React, { Suspense } from 'react';
import AppLayout from '../../components/core/app-layout';
import LoadingOverlay from '../../components/core/loading-overlay';

const ExchangeSideMenu = React.lazy(() =>
  import('../../components/common/exchange-sidemenu'),
);
const ProductPromotion = React.lazy(() => import('./ui/suggestions'));
const SportPageContent = React.lazy(() => import('./ui/page-content'));

function Sports() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout
        sidebarLeft={<ExchangeSideMenu className="d-none d-lg-block" />}
        sidebarRight={<ProductPromotion />}
        pageContent={<SportPageContent />}
      />
    </Suspense>
  );
}

export default Sports;
