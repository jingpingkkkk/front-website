/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { postRequest } from '../../../../api';
import EventList from '../events';
import GreyhoundRacing from '../greyhound-racing';

function SportsWiseEvents({ selectedSport }) {
  const [eventLoading, setEventLoading] = useState(false);
  const [sportEvents, setSportEvents] = useState([]);
  const [sportName, setSportName] = useState(null);
  const [activeTab, setActiveTab] = useState('');

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
    <div>
      {!eventLoading ? (
        sportName === 'Greyhound Racing' ? (
          <GreyhoundRacing
            events={sportEvents}
            sportName={sportName}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        ) : (
          <EventList events={sportEvents} sportName={sportName} />
        )
      ) : (
        <div className="col-md-12 text-center mt-2">
          <Spinner className="text-primary" />
        </div>
      )}
    </div>
  );
}

export default SportsWiseEvents;
