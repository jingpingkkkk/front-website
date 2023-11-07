/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import SportsTabs from '../sports-tabs';
import AllLiveSports from './allLiveSports';
import SportsWiseEvents from './sportsWiseEvents';

function UpcommingMatches() {
  const availableSports = useSelector((state) => state.sportsList?.sports);
  const loading = useSelector((state) => state.sportsList?.loading);

  const [selectedSport, setSelectedSport] = useState({
    _id: 0,
    name: 'In Play',
  });

  return (
    <>
      {loading ? (
        <div className="col-md-12 text-center mt-2">
          <Spinner className="text-primary" />
        </div>
      ) : availableSports?.length ? (
        <SportsTabs
          availableSports={availableSports}
          onClick={(id, name) => setSelectedSport({ _id: id, name })}
        />
      ) : (
        <div>No Data </div>
      )}
      {loading ? (
        ''
      ) : selectedSport?.name === 'In Play' ? (
        <AllLiveSports />
      ) : (
        <SportsWiseEvents selectedSport={selectedSport} />
      )}
    </>
  );
}

export default UpcommingMatches;
