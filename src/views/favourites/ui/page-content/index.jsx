import 'jspdf-autotable';
import React from 'react';
import UpcommingMatchList from '../upcomming-matches';

function FavouriteMatchPageContent() {
  return (
    <div className="comman-bg">
      <div className="table-section mt-3">
        <div className="tab-content">
          <UpcommingMatchList />
        </div>
      </div>
    </div>
  );
}

export default FavouriteMatchPageContent;
