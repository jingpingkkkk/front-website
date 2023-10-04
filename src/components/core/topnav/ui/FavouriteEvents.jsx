/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

function FavouriteEvents({ favouriteEvents, handleEventClick }) {
  return (
    <div>
      <div className="event-title">Favourite Matches</div>
      <ul className="fav-events ps-0">
        {favouriteEvents?.length
          ? favouriteEvents?.map((favEvent) => (
              <li
                className="py-1 cursor-pointer"
                key={favEvent?._id}
                onClick={() => handleEventClick(favEvent?._id, '/matches')}
              >
                {favEvent?.name || ''}
              </li>
            ))
          : ''}
      </ul>
    </div>
  );
}

export default FavouriteEvents;
