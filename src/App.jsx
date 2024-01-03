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
const ChangePassword = React.lazy(() => import('./views/changepassword'));
const PromotionPage = React.lazy(() => import('./views/promotion'));
const CasinoPage = React.lazy(() => import('./views/casino'));
const UpComingPage = React.lazy(() => import('./views/upcoming'));
const LiveMatchPage = React.lazy(() => import('./views/live'));
const FavouriteMatchPage = React.lazy(() => import('./views/favourites'));
const CasinoDetailPage = React.lazy(() => import('./views/casinodetail'));
const WithdrawPage = React.lazy(() => import('./views/withdraw'));

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
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/promotion" element={<PromotionPage />} />
          <Route path="/casino" element={<CasinoPage />} />
          <Route path="/upcoming" element={<UpComingPage />} />
          <Route path="/live" element={<LiveMatchPage />} />
          <Route path="/favourites" element={<FavouriteMatchPage />} />
          <Route path="/casinodetail" element={<CasinoDetailPage />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
