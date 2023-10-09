import React, { Suspense } from 'react';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const ChangePasswordPageContent = React.lazy(() => import('./ui/page-content'));

function ChangePassword() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout pageContent={<ChangePasswordPageContent />} />
    </Suspense>
  );
}

export default ChangePassword;
