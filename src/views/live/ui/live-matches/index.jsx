/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { postRequest } from '../../../../api';
import EventList from '../../../sports/ui/events';
import GreyhoundRacing from '../../../sports/ui/greyhound-racing';

function LiveMatchList() {
  const [eventLoading, setEventLoading] = useState(false);
  const [sportEvents, setSportEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('');

  const fetchSportDetails = async (skipLoading = false) => {
    try {
      if (!skipLoading) setEventLoading(true);
      const result = await postRequest(
        'event/upcomingLiveEvents',
        { type: 'live' },
        false,
      );
      if (result?.success) {
        setSportEvents(result?.data?.details || []);
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
    fetchSportDetails(false);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: '550px' }}>
      {eventLoading ? (
        <div className="col-md-12 text-center mt-2">
          <Spinner className="text-primary" />
        </div>
      ) : sportEvents?.length ? (
        !sportEvents?.every((sport) => sport?.event?.length) ? (
          <div className="text-primary text-center">No Data</div>
        ) : (
          sportEvents?.map((sport) =>
            sport?.event?.length ? (
              sport?.name === 'Greyhound Racing' ? (
                <GreyhoundRacing
                  events={sport?.event}
                  sportName={sport?.name}
                  key={sport?._id}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              ) : (
                <EventList
                  events={sport?.event}
                  sportName={sport?.name}
                  key={sport?._id}
                />
              )
            ) : (
              ''
            ),
          )
        )
      ) : (
        'No Data'
      )}
    </div>
  );
}

export default LiveMatchList;
