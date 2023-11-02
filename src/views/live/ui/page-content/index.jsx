/* eslint-disable no-nested-ternary */
/* eslint-disable new-cap */
/* eslint-disable react/no-unstable-nested-components */
import 'jspdf-autotable';
import React from 'react';
import LiveMatchList from '../live-matches';

function LiveMatchPageContent() {
  return (
    <div className="comman-bg">
      <div className="table-section mt-3">
        <div className="tab-content">
          <LiveMatchList />
        </div>
      </div>
    </div>
  );
}

export default LiveMatchPageContent;
