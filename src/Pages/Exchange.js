import React from "react";
import logo from "../logo.svg";
import Sidebar from "../components/sidebar";
import Footer from "../components/Footer";
import TabSection from "../components/tab-section";
import { Carousel } from "../components/Carousel";
import { FantasyGames } from "../components/FantasyGames";
import { LiveCasino } from "../components/LiveCasino";
import { Promotion } from "../components/Promotion";
export const Exchange = () => {
  return (
    <main className="main">
      <div className="container-fluid">
        <div className="row mobile-griad-layout">
          <div className="col-md-3 col-sm-12 col-12 first-sidebar">
            <Sidebar />
          </div>
          <div class="col-md-6 col-sm-12 col-12 middele-content">
            <Carousel />
            <TabSection />
            <FantasyGames />
            <LiveCasino />
          </div>
          <Promotion />
        </div>
        <Footer />
      </div>
    </main>
  );
};
