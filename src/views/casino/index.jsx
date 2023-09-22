import React, { Suspense } from 'react';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const CasinoSideMenu = React.lazy(() =>
  import('../../components/common/casino-sidemenu'),
);
const CasinoPageContent = React.lazy(() => import('./ui/page-content'));

function Casino() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout
        sidebarLeft={<CasinoSideMenu />}
        pageContent={<CasinoPageContent />}
      />
    </Suspense>
  );
}

export default Casino;
