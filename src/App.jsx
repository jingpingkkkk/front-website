import React, { Suspense, useEffect } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { handshake } from './api/encryption';
import LoadingOverlay from './components/common/loading-overlay';

const ErrorStatus404 = React.lazy(() => import('./views/error-views/404'));
const Sports = React.lazy(() => import('./views/sports'));
const Matches = React.lazy(() => import('./views/matches'));
const CurrentBets = React.lazy(() => import('./views/currentbets'));
const Notification = React.lazy(() => import('./views/notification'));
const AccountStatement = React.lazy(() => import('./views/accountstatement'));

function App() {
  useEffect(() => {
    const interval = setInterval(
      async () => {
        await handshake();
      },
      1000 * 60 * 5,
    );
    handshake();
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem('reload')) {
      localStorage.removeItem('reload');
      window.location.reload();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Suspense fallback={<LoadingOverlay />}>
        <Routes>
          <Route path="*" element={<ErrorStatus404 />} />
          <Route path="/" element={<Navigate to="/sports" />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/currentbets" element={<CurrentBets />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/accountstatement" element={<AccountStatement />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
