/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import SportsTabs from '../sports-tabs';
import { getRequest, postRequest } from '../../../../api';
import EventList from '../events';

function UpcommingMatches() {
  const [availableSports, setAvailableSports] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const getAllSports = async () => {
    try {
      setLoading(true);
      const result = await getRequest('exchangeHome/sportsList', false);
      if (result?.success) {
        setAvailableSports(result?.data || []);
        if (result?.data?.length) {
          fetchSportDetails(result?.data?.[0]?._id, result?.data?.[0]?.name);
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {!loading && availableSports?.length ? (
        <SportsTabs
          availableSports={availableSports}
          onClick={(id, name) => fetchSportDetails(id, name)}
        />
      ) : (
        <Spinner color="secondary" />
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
