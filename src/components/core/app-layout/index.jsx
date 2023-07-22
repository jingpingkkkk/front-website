import React from 'react';
import Footer from '../footer';
import Topnav from '../topnav';

function AppLayout({ sidebarLeft, sidebarRight, pageContent }) {
  return (
    <>
      <Topnav />

      <main className="main" id="main">
        <div className="container-fluid">
          <div className="row mobile-griad-layout">
            <div className="col-md-3 col-sm-12 col-12 first-sidebar">{sidebarLeft}</div>

            <div className="col-md-6 col-sm-12 col-12 middele-content">{pageContent}</div>

            <div className="col-md-3 col-sm-12 col-12 last-sidebar">{sidebarRight}</div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}

export default AppLayout;
