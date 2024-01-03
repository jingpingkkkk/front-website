import 'jspdf-autotable';
import React from 'react';
import UpcommingMatchList from '../upcomming-matches';

function UpComingMatchPageContent() {
  return (
    <div className="comman-bg">
      <div className="table-section">
        <div className="tab-content">
          <UpcommingMatchList />
        </div>
      </div>
    </div>
  );
}

export default UpComingMatchPageContent;
