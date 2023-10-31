import React, { Suspense } from 'react';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const PromotionPageContent = React.lazy(() => import('./ui/page-content'));
const ExchangeSideMenu = React.lazy(() =>
  import('../../components/common/exchange-sidemenu'),
);
const ProductPromotion = React.lazy(() =>
  import('../../components/common/suggestions'),
);

function PromotionPage() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout
        sidebarLeft={<ExchangeSideMenu />}
        pageContent={<PromotionPageContent />}
        sidebarRight={<ProductPromotion />}
      />
    </Suspense>
  );
}

export default PromotionPage;
