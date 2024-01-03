import 'jspdf-autotable';
import React from 'react';
import LiveMatchList from '../live-matches';

function LiveMatchPageContent() {
  return (
    <div className="comman-bg">
      <div className="table-section">
        <div className="tab-content">
          <LiveMatchList />
        </div>
      </div>
    </div>
  );
}

export default LiveMatchPageContent;
