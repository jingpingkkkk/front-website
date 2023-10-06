import React, { Suspense } from 'react';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const NotificationPageContent = React.lazy(() => import('./ui/page-content'));

function Notifications() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout pageContent={<NotificationPageContent />} />
    </Suspense>
  );
}

export default Notifications;
