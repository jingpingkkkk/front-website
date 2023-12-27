/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'reactstrap';
import { postRequest } from '../../../../api';
import { setAllEvents } from '../../../../redux/reducers/event-market';
import {
  setFavouriteEventsCount,
  setLiveEventsCount,
  setUpComingEventsCount,
} from '../../../../redux/reducers/sports-list';
import EventList from '../events';
import GreyhoundRacing from '../greyhound-racing';

function SportsWiseEvents({ selectedSport }) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { allEvents } = useSelector((state) => state.eventMarket);
  const [eventLoading, setEventLoading] = useState(false);
  const [sportName, setSportName] = useState(null);
  const [activeTab, setActiveTab] = useState('');

  const fetchSportDetails = async (skipLoading = false) => {
    if (!selectedSport?._id) {
      return;
    }
    setSportName(selectedSport?.name);
    try {
      if (!skipLoading) setEventLoading(true);
      const result = await postRequest('exchangeHome/sportWiseMatchList', {
        sportId: selectedSport?._id,
        userId: userDetails?.user?._id,
      });
      if (result?.success) {
        dispatch(setUpComingEventsCount(result?.data?.totalUpcomingEvent));
        dispatch(setLiveEventsCount(result?.data?.totalLiveEvent || 0));
        dispatch(setFavouriteEventsCount(result?.data?.totalFavouriteEvent));
        dispatch(
          setAllEvents([
            { _id: selectedSport?._id, events: result?.data?.events || [] },
          ]),
        );
      } else {
        dispatch(setAllEvents([]));
      }
      setEventLoading(false);
    } catch (error) {
      dispatch(setAllEvents([]));
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
            events={allEvents[0]?.events}
            sportName={sportName}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        ) : (
          <EventList
            events={allEvents[0]?.events}
            sportName={sportName}
            sportsId={selectedSport?._id}
          />
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
