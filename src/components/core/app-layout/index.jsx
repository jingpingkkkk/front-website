/* eslint-disable no-nested-ternary */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Footer from '../footer';
import Topnav from '../topnav';

function AppLayout({ sidebarLeft, sidebarRight, pageContent }) {
  const isSidebarLeft = sidebarLeft !== undefined;
  const isSidebarRight = sidebarRight !== undefined;

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

          <Col
            md="12"
            lg={contentMdColWidth}
            className={` ${
              isSidebarRight && isSidebarLeft ? 'main-content' : 'main-area'
            }`}
          >
            {pageContent}
          </Col>

          {sidebarRight ? (
            <Col lg="2" className="right-side">
              {sidebarRight}
            </Col>
          ) : null}
        </Row>
        <Footer sidebarLeft={sidebarLeft} sidebarRight={sidebarRight} />
      </Container>
      {/* {isMobile || isTablet ? <Bottomnav /> : ''} */}
    </>
  );
}

export default AppLayout;
