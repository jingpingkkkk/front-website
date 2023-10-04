/* eslint-disable no-nested-ternary */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Footer from '../footer';
import Topnav from '../topnav';
import Bottomnav from '../bottomnav';
import useScreenWidth from '../../../hooks/use-screen-width';

function AppLayout({ sidebarLeft, sidebarRight, pageContent }) {
  const isSidebarLeft = sidebarLeft !== undefined;
  const isSidebarRight = sidebarRight !== undefined;

  const { isMobile, isTablet } = useScreenWidth();

  const contentMdColWidth = isSidebarLeft
    ? isSidebarRight
      ? '8'
      : '10'
    : isSidebarRight
    ? '9'
    : '12';

  return (
    <>
      <Topnav />

      <Container fluid className="px-3">
        <Row>
          {sidebarLeft ? (
            <Col lg="2" className="left-sidebar">
              {sidebarLeft}
            </Col>
          ) : null}

          <Col md="12" lg={contentMdColWidth}>
            {pageContent}
          </Col>

          {sidebarRight ? (
            <Col lg="2" className="right-side">
              {sidebarRight}
            </Col>
          ) : null}
        </Row>
        <Footer />
      </Container>
      {isMobile || isTablet ? <Bottomnav /> : ''}
    </>
  );
}

export default AppLayout;
