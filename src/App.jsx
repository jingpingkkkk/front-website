import React, { Suspense, useEffect } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { handshake } from './api';
import LoadingOverlay from './components/common/loading-overlay';
import CurrentBets from './views/currentbets';

const ErrorStatus404 = React.lazy(() => import('./views/error-views/404'));
const Sports = React.lazy(() => import('./views/sports'));
const Matches = React.lazy(() => import('./views/matches'));

function App() {
  useEffect(() => {
    if (localStorage.getItem('reload')) {
      localStorage.removeItem('reload');
      window.location.reload();
    }
    handshake();
  }, []);

  return (
    <Suspense fallback={<LoadingOverlay />}>
      <Router>
        <Routes>
          <Route path="*" element={<ErrorStatus404 />} />
          <Route path="/" element={<Navigate to="/sports" />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/currentbets" element={<CurrentBets />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
