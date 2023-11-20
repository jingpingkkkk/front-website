/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postRequest } from '../../../../api';
import EventList from '../events';
import GreyhoundRacing from '../greyhound-racing';
import {
  setFavouriteEventsCount,
  setLiveEventsCount,
  setTotalEventsCount,
  setUpComingEventsCount,
} from '../../../../redux/reducers/sports-list';
import { setUserDetails } from '../../../../redux/reducers/user-details';

function AllLiveSports() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const [eventLoading, setEventLoading] = useState(false);
  const [sportEvents, setSportEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('');

  const rehydrateUser = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) return null;
    const result = await postRequest('users/rehydrateUser');
    if (result.success) {
      dispatch(setUserDetails(result.data.details));
      return result.data.details;
    }
    return null;
  };

  const fetchSportDetails = async (skipLoading = false) => {
    try {
      let user = userDetails?.user;
      if (!userDetails?.user?._id) {
        user = await rehydrateUser();
      }
      if (!skipLoading) setEventLoading(true);
      const result = await postRequest(
        'exchangeHome/sportWiseMatchList',
        { type: 'live', userId: user?._id },
        false,
      );
      if (result?.success) {
        setSportEvents(result?.data?.events || []);
        dispatch(setTotalEventsCount(result?.data?.totalEvent || 0));
        dispatch(setLiveEventsCount(result?.data?.totalLiveEvent || 0));
        dispatch(setUpComingEventsCount(result?.data?.totalUpcomingEvent));
        dispatch(setFavouriteEventsCount(result?.data?.totalFavouriteEvent));
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
  }, []);

  return (
    <div>
      {eventLoading ? (
        <div className="col-md-12 text-center mt-2">
          <Spinner className="text-primary" />
        </div>
      ) : sportEvents?.length ? (
        sportEvents?.every((sport) => !sport?.events?.length) ? (
          <div className="text-primary text-center">No Data</div>
        ) : (
          sportEvents?.map((sport) =>
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

export default AllLiveSports;
