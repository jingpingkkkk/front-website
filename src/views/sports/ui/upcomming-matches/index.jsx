/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import { postRequest } from '../../../../api';
import EventList from '../events';
import SportsTabs from '../sports-tabs';

function UpcommingMatches() {
  const availableSports = useSelector((state) => state.sportsList?.sports);
  const loading = useSelector((state) => state.sportsList?.loading);

  const [eventLoading, setEventLoading] = useState(false);
  const [sportEvents, setSportEvents] = useState([]);
  const [sportName, setSportName] = useState(null);
  const [selectedSport, setSelectedSport] = useState({});

  const fetchSportDetails = async (skipLoading = false) => {
    if (!selectedSport?._id) {
      return;
    }
    setSportName(selectedSport?.name);
    try {
      if (!skipLoading) setEventLoading(true);
      const result = await postRequest(
        'exchangeHome/sportWiseMatchList',
        { sportId: selectedSport?._id },
        false,
      );
      if (result?.success) {
        setSportEvents(result?.data);
      } else {
        setSportEvents([]);
      }
      setEventLoading(false);
    } catch (error) {
      setSportEvents([]);
      setEventLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedSport?._id) {
      setSelectedSport(availableSports.length ? availableSports[0] : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableSports.length]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await fetchSportDetails(true);
    }, 5000);
    fetchSportDetails();
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSport]);

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
      ) : !eventLoading ? (
        <EventList events={sportEvents} sportName={sportName} />
      ) : (
        <div className="col-md-12 text-center mt-2">
          <Spinner className="text-primary" />
        </div>
      )}
    </>
  );
}

export default UpcommingMatches;
