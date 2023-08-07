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
    ? '10'
    : '12';

  return (
    <>
      <Topnav />

      <Container fluid className="px-3">
        <Row>
          {sidebarLeft ? <Col lg="2">{sidebarLeft}</Col> : null}

          <Col md="12" lg={contentMdColWidth}>
            {pageContent}

            <Footer />
          </Col>

          {sidebarRight ? <Col lg="2">{sidebarRight}</Col> : null}
        </Row>
      </Container>
    </>
  );
}

export default AppLayout;
