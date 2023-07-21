import React from "react";
import logo from "../logo.svg";
import Sidebar from "../layouts/Sidebar/Sidebar";
import Footer from "../layouts/Footer/Footer";
import TabSection from "../components/tab-section";
import { Carousel } from "../components/Carousel";
import { FantasyGames } from "../components/FantasyGames";
import { LiveCasino } from "../components/LiveCasino";
import { Promotion } from "../components/Promotion";
import LiveCasinoSidebar from "../layouts/LiveCasinoSidebar/LiveCasinoSidebar";

export const LiveCasinoPage = () => {
  return (
    <main className="main">
      <div className="container-fluid">
        <div className="row mobile-griad-layout">
          <div className="col-md-3 col-sm-12 col-12 first-sidebar">
            <LiveCasinoSidebar />
          </div>
          <div className="col-md-6 col-sm-12 col-12 middele-content">
            {/* <Carousel /> */}
            {/* <TabSection /> */}
            <FantasyGames />
            {/* <LiveCasino /> */}
          </div>
          {/* <Promotion /> */}
        </div>
        <Footer />
      </div>
    </main>
  );
};
