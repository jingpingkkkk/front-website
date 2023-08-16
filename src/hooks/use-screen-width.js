import { useEffect, useState } from 'react';

export default function useScreenWidth() {
  const breakpoints = {
    mobile: 576,
    tablet: 768,
    desktop: 992,
    largeDesktop: 1200,
    extraLargeDesktop: 1400,
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isMobile: width <= breakpoints.mobile,
    isTablet: width <= breakpoints.tablet,
    isDesktop: width <= breakpoints.desktop,
    isLargeDesktop: width <= breakpoints.largeDesktop,
    isExtraLargeDesktop: width >= breakpoints.extraLargeDesktop,
  };
}
