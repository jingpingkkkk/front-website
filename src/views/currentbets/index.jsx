import React, { Suspense } from 'react';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const CurrentBetPageContent = React.lazy(() => import('./ui/page-content'));

function CurrentBets() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout pageContent={<CurrentBetPageContent />} />
    </Suspense>
  );
}

export default CurrentBets;
