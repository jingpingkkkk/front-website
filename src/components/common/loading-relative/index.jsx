import React, { useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import './loadingRelative.css';

function LoadingRelative({ loadingText = '', color = '#075ba6' }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`loading-relative ${visible ? 'fade-in' : 'fade-out'}`}>
      <BounceLoader color={color} />

      {loadingText ? (
        <div className="loading-text pt-3 h5">{loadingText}</div>
      ) : null}
    </div>
  );
}

export default LoadingRelative;
