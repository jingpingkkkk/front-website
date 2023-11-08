import React, { Suspense } from 'react';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const FavouriteMatchPageContent = React.lazy(() => import('./ui/page-content'));
const ExchangeSideMenu = React.lazy(() =>
  import('../../components/common/exchange-sidemenu'),
);
const ProductPromotion = React.lazy(() =>
  import('../../components/common/suggestions'),
);

function FavouriteMatchPage() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout
        sidebarLeft={<ExchangeSideMenu />}
        pageContent={<FavouriteMatchPageContent />}
        sidebarRight={<ProductPromotion />}
      />
    </Suspense>
  );
}

export default FavouriteMatchPage;
