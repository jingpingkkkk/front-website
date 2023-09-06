import React, { useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import './loadingOverlay.css';
import { useDispatch } from 'react-redux';
import { setThemeSettings } from '../../../redux/reducers/theme-settings';
import { postRequest } from '../../../api';
import ipDetails from '../../../helper/ip-information';

function LoadingOverlay({ loadingText = '', color = '#d5be77' }) {
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();
  const getThemeSettings = async () => {
    const ipAddress = await ipDetails();
    // use this domainUrl in body
    // const domainUrl = window.location.origin;
    const body = {
      countryName: ipAddress?.country,
      domainUrl: 'https://gogle.com',
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
    getThemeSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`loading-overlay ${visible ? 'fade-in' : 'fade-out'}`}>
      <BounceLoader color={color} />

      {loadingText ? (
        <div className="loading-text pt-3 h5">{loadingText}</div>
      ) : null}
    </div>
  );
}

export default LoadingOverlay;
