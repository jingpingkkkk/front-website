import React, { Suspense } from 'react';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const WithdrawPageContent = React.lazy(() => import('./ui/page-content'));
const ExchangeSideMenu = React.lazy(() =>
  import('../../components/common/exchange-sidemenu'),
);

function WithdrawPage() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout
        sidebarLeft={<ExchangeSideMenu />}
        pageContent={<WithdrawPageContent />}
      />
    </Suspense>
  );
}

export default WithdrawPage;
