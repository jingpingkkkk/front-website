/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest } from '../../../../api';
import EventList from '../../../sports/ui/events';
import GreyhoundRacing from '../../../sports/ui/greyhound-racing';
import {
  setFavouriteEventsCount,
  setLiveEventsCount,
  setUpComingEventsCount,
} from '../../../../redux/reducers/sports-list';
import { setAllEvents } from '../../../../redux/reducers/event-market';

function UpcommingMatchList() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { allEvents } = useSelector((state) => state.eventMarket);
  const [eventLoading, setEventLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const fetchSportDetails = async (skipLoading = false) => {
    try {
      if (!skipLoading) setEventLoading(true);
      const result = await postRequest(
        'exchangeHome/sportWiseMatchList',
        { type: 'upcoming', userId: userDetails?.user?._id },
        false,
      );
      if (result?.success) {
        dispatch(setLiveEventsCount(result?.data?.totalLiveEvent || 0));
        dispatch(setUpComingEventsCount(result?.data?.totalUpcomingEvent));
        dispatch(setFavouriteEventsCount(result?.data?.totalFavouriteEvent));
        dispatch(setAllEvents(result?.data?.events || []));
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
  }, []);

  return (
    <div style={{ minHeight: '550px' }}>
      {eventLoading ? (
        <div className="col-md-12 text-center mt-2">
          <Spinner className="text-primary" />
        </div>
      ) : allEvents?.length ? (
        allEvents?.every((sport) => !sport?.events?.length) ? (
          <div className="text-primary text-center">No Data</div>
        ) : (
          allEvents?.map((sport) =>
            sport?.events?.length ? (
              sport?.sportName === 'Greyhound Racing' ? (
                <GreyhoundRacing
                  events={sport?.events}
                  sportName={sport?.sportName}
                  key={sport?._id}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              ) : (
                <EventList
                  events={sport?.events}
                  sportName={sport?.sportName}
                  key={sport?._id}
                  sportsId={sport?._id}
                />
              )
            ) : (
              ''
            ),
          )
        )
      ) : (
        <div className="text-primary text-center">No Data</div>
      )}
    </div>
  );
}

export default UpcommingMatchList;
