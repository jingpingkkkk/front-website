import React from 'react';
import CasinoTabs from '../casino-tabs';
import availableCasino from '../casino-tabs/data';

function CasinoPageContent() {
  return (
    <div className="table-section mt-3">
      <div className="tab-content">
        <CasinoTabs
          availableCasino={availableCasino}
          onClick={(id, name) => console.log(id, name)}
        />

        <div className="tab-content">
          <div
            role="tabpanel"
            className="tab-pane fade in active"
            id="All_Casino"
          >
            <div className="griad-games">
              <div className="geiad-layout-four">
                <div className="casino-banner-item login-hover">
                  <a href="/">
                    <img alt="casino" src="images/teen3.jpg" />
                    <div role="button">Login</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CasinoPageContent;
