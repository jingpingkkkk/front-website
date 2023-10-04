import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { postRequest } from './api';
import { handshake } from './api/encryption';
import LoadingOverlay from './components/common/loading-overlay';
import { setThemeSettings } from './redux/reducers/theme-settings';
import CurrentBets from './views/currentbets';

const ErrorStatus404 = React.lazy(() => import('./views/error-views/404'));
const Sports = React.lazy(() => import('./views/sports'));
const Matches = React.lazy(() => import('./views/matches'));

function App() {
  const dispatch = useDispatch();

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

  const getThemeSettings = async () => {
    // const ipAddress = await ipDetails();
    const body = {
      // countryName: ipAddress?.country,
      countryName: 'IN',
      domainUrl: window?.location?.origin,
    };
    const result = await postRequest(
      'themeSetting/themeSettingByCurrencyAndDomain',
      body,
      false,
    );
    if (result.success) {
      const data = result?.data?.details;
      dispatch(setThemeSettings(data));
    }
  };

  useEffect(() => {
    if (localStorage.getItem('reload')) {
      localStorage.removeItem('reload');
      window.location.reload();
    }
    getThemeSettings();
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
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
