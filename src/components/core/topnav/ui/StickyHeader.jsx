import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';

function StickyHeader({ children }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={isSticky ? 'stiky-header' : ''}>
      <Container fluid>
        <div className="header-main">{children}</div>
      </Container>
    </header>
  );
}

export default StickyHeader;
