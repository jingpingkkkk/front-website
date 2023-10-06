import React, { Suspense } from 'react';
import LoadingOverlay from '../../components/common/loading-overlay';
import AppLayout from '../../components/core/app-layout';

const AccountStatementPageContent = React.lazy(() =>
  import('./ui/page-content'),
);

function AccountStatement() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppLayout pageContent={<AccountStatementPageContent />} />
    </Suspense>
  );
}

export default AccountStatement;
