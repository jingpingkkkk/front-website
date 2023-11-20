/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import './scroll.css';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible ? (
        <div className="Scroll-top_icon">
          <a
            href="/"
            className="scrollToTop"
            style={{ display: 'block' }}
            onClick={(e) => {
              scrollToTop(e);
            }}
          >
            <img
              src="/images/arrow-down.svg"
              alt="arrow"
              className="scroll-top-img"
            />
          </a>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default ScrollToTop;
