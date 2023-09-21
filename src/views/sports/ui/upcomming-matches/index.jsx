/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import { useSelector } from 'react-redux';
import SportsTabs from '../sports-tabs';
import { postRequest } from '../../../../api';
import EventList from '../events';

function UpcommingMatches() {
  const availableSports = useSelector((state) => state.sportsList?.sports);

  const [loading] = useState(false);
  const [eventLoading, setEventLoading] = useState(false);
  const [sportEvents, setSportEvents] = useState(availableSports[0]);
  const [sportName, setSportName] = useState(availableSports[0]);

  const fetchSportDetails = async (id, name) => {
    setSportName(name);
    try {
      setEventLoading(true);
      const result = await postRequest('exchangeHome/sportWiseMatchList', {
        sportId: id,
      });
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
    if (availableSports?.length) {
      fetchSportDetails(availableSports?.[0]?._id, availableSports?.[0]?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableSports?.length]);
  return (
    <>
      {loading ? (
        <Spinner color="secondary" />
      ) : availableSports?.length ? (
        <SportsTabs
          availableSports={availableSports}
          onClick={(id, name) => fetchSportDetails(id, name)}
        />
      ) : (
        <div>No Data </div>
      )}
      {!loading ? (
        !eventLoading ? (
          <EventList events={sportEvents} sportName={sportName} />
        ) : (
          <Spinner color="secondary" />
        )
      ) : (
        ''
      )}
    </>
  );
}

export default UpcommingMatches;
