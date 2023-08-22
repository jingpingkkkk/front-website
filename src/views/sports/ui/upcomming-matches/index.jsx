/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import SportsTabs from '../sports-tabs';
import { getRequest } from '../../../../api';

function UpcommingMatches() {
  const [availableSports, setAvailableSports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSport, setSelectedSport] = useState(availableSports[0]);

  const fetchSportDetails = (id) => {
    const sport = availableSports.find((item) => item.id === id);
    setSelectedSport(sport);
  };
  const getAllSports = async () => {
    try {
      setLoading(true);
      const result = await getRequest('exchangeHome/sportsList', false);
      if (result?.success) {
        setAvailableSports(result?.data || []);
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
          onClick={(id) => fetchSportDetails(id)}
        />
      ) : (
        <Spinner color="secondary" />
      )}
      {selectedSport ? (
        <div className="tab-pane fade in active">
          <div className="bet-table">
            <div className="custom-table">
              <div className="cus-row row1 title-row">
                <div className="cus-col1 cus-w-10" />
                <div className="cus-col1 cus-w-60" />
                <div className="cus-col1 cus-w-10">1</div>
                <div className="cus-col1 cus-w-10">X</div>
                <div className="cus-col1 cus-w-10">2</div>
              </div>

              {selectedSport.matches?.length
                ? selectedSport.matches.map((match, index) => (
                    <div
                      className="cus-row table-block-row"
                      key={`${match.name} ${index}`}
                    >
                      <div className="cus-col1 cus-w-10">
                        <div className="match-date">
                          <span className="day text-capitalize">
                            {match.eventOn}
                          </span>
                          <span className="-timedate">3:00 PM</span>
                        </div>
                      </div>

                      <div className="cus-col1 cus-w-60">
                        <div className="match-disc">
                          <div className="teamname pt-1">
                            {match.name}
                            {/* Hampshire <img src="images/vs.png" /> Somerset */}
                          </div>
                          <div className="team-owner pt-2">{match.league}</div>
                        </div>
                      </div>

                      {match.odds?.length
                        ? match.odds.map((odd, i) => (
                            <div
                              className="cus-col1 cus-w-10"
                              key={odd.back + i}
                            >
                              <div className="details">
                                <span className="left">
                                  {odd.back.toFixed(2)}
                                </span>
                                <span className="right">
                                  {odd.lay.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default UpcommingMatches;
