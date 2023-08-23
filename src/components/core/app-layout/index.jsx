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
      ? '7'
      : '10'
    : isSidebarRight
    ? '9'
    : '12';

  return (
    <>
      <Topnav />

      <Container fluid className="px-3">
        <Row>
          {sidebarLeft ? <Col lg="2">{sidebarLeft}</Col> : null}

          <Col md="12" lg={contentMdColWidth}>
            {pageContent}
          </Col>

          {sidebarRight ? <Col lg="3">{sidebarRight}</Col> : null}
        </Row>
        <Footer />
      </Container>
    </>
  );
}

export default AppLayout;
