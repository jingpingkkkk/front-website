/* eslint-disable no-nested-ternary */
/* eslint-disable new-cap */
/* eslint-disable react/no-unstable-nested-components */
import 'jspdf-autotable';
import React, { useEffect, useState } from 'react';
import { postRequest } from '../../../../api';
import LoadingOverlay from '../../../../components/common/loading-overlay';
import './promotion.css';

function PromotionPageContent() {
  const [activeTab, setActiveTab] = useState('sport');
  const [activeDetailTab, setActiveDetailTab] = useState('rules');
  const [isReadMore, setIsReadMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [promoData, setPromoData] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState('');
  const onReadMore = (detail) => {
    setIsReadMore(!isReadMore);
    setSelectedPromo(detail);
  };
  const fetchPromotionData = async () => {
    try {
      // const ipAddress = await ipDetails();
      const body = {
        // countryName: ipAddress?.country,
        countryName: 'IN',
        domainUrl: window?.location?.origin,
      };
      setLoading(true);
      const result = await postRequest('promotion/allPromotion', body);
      if (result?.success) {
        const sports = result?.data?.details?.filter(
          (data) => data?.promotionType === activeTab,
        );
        setPromoData(sports);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPromotionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);
  return (
    <div className="comman-bg">
      {!isReadMore ? (
        <div className="promo_box">
          <div className="casino-report-tabs">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <button
                  type="button"
                  className={
                    activeTab === 'sport' ? 'nav-link active' : 'nav-link'
                  }
                  role="tab"
                  onClick={() => setActiveTab('sport')}
                >
                  Sports
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className={
                    activeTab === 'casino' ? 'nav-link active' : 'nav-link'
                  }
                  role="tab"
                  onClick={() => setActiveTab('casino')}
                >
                  Casino
                </button>
              </li>
            </ul>
          </div>
          <div className="promo-details">
            {loading ? (
              <LoadingOverlay />
            ) : promoData?.length ? (
              promoData?.map((promo) => (
                <div className="coupens" key={promo?._id}>
                  <div className="coupens-position">
                    <div className="coupens-top-part">
                      <div className="coupens-text">
                        <div className="title2"> {promo?.title || ''} </div>
                        <div
                          className="cash"
                          dangerouslySetInnerHTML={{
                            __html: promo?.description || '',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="coupens-bottom-text">
                    <div>
                      {/* <div className="coupens-bets"> first deposit 10%</div> */}
                    </div>
                    <div className="read-more">
                      <button type="button" onClick={() => onReadMore(promo)}>
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No Data</div>
            )}
          </div>
        </div>
      ) : (
        <div className="promo_box">
          <div className="pdetails">
            <div className="top-details">
              <div className="bonus-detail col s12">
                <div className="bonus-details">
                  <div className="offer-details">
                    <div className="title"> {selectedPromo?.title || ''} </div>
                  </div>
                  <div className="back-button right">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => setIsReadMore(!isReadMore)}
                    >
                      <span className="animate-btn">
                        <i className="fas fa-chevron-left" /> Back to Promo
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="promo-tabs">
              <div className="promotion-tabs">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <button
                      type="button"
                      className={
                        activeDetailTab === 'rules'
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      role="tab"
                      onClick={() => setActiveDetailTab('rules')}
                    >
                      Rules
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      type="button"
                      className={
                        activeDetailTab === 'terms'
                          ? 'nav-link active'
                          : 'nav-link'
                      }
                      role="tab"
                      onClick={() => setActiveDetailTab('terms')}
                    >
                      Terms And Conditions
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-contents">
                <div id="test1" className="active">
                  <div
                    className="col-md-12 terms"
                    dangerouslySetInnerHTML={{
                      __html:
                        activeDetailTab === 'rules'
                          ? selectedPromo?.rules || ''
                          : selectedPromo?.termsConditions || '',
                    }}
                  />
                </div>
              </div>
              {/* <div className="play-now-btn">
                <button type="button" className="btn">
                  <span className="animate-btn">Play Now</span>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromotionPageContent;
