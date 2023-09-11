/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Label } from 'reactstrap';
import DataTable from 'react-data-table-component';
import LoadingOverlay from '../../../../components/common/loading-overlay';
import { postRequest } from '../../../../api';

function CurrentBetPageContent() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('sports');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchApiData = async () => {
    setLoading(true);
    try {
      const result = await postRequest('bet/getCurrentBetsUserwise', {
        loginUserId: '64f1b90f95883a1ff9a17221',
        page: currentPage,
        perPage: 10,
      });
      if (result?.success) {
        setData(result?.data?.details?.records || []);
        setTotalPages(result?.data?.details?.totalRecords);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: 'Sports',
      selector: (row) => row.sportName,
    },
    {
      name: 'Event Name',
      selector: (row) => row.eventName,
    },
    {
      name: 'Market Name',
      selector: (row) => row.marketName,
    },
    {
      name: 'Nation',
      selector: (row) => row.sportName,
    },
    {
      name: 'User Rate',
      selector: (row) => row.sportName,
    },
    {
      name: 'Amount	Place Date',
      selector: (row) => row.sportName,
    },
    {
      name: 'Action',
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchApiData(currentPage);
  }, [currentPage]);

  const customStyles = {
    table: {
      style: {
        border: '1px solid #3c444b',
        backgroundColor: '#2E3439',
        color: '#AAAFB5',
      },
    },
    headCells: {
      style: {
        backgroundColor: '#3c444b',
        color: '#AAAFB5',
        fontSize: '16px',
      },
    },
    rows: {
      style: {
        cursor: 'pointer',
        backgroundColor: '#23292E',
        color: '#AAAFB5',
        fontSize: '14px',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#3c444b',
        color: '#AAAFB5',
        fontSize: '14px',
      },
    },
  };

  return loading ? (
    <LoadingOverlay />
  ) : (
    <div className="comman-bg mb-0">
      <div className="report-box">
        <div className="report-title">
          <div className="report-name">Current Bets</div>
        </div>
        <div className="casino-report-tabs">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className={
                  activeTab === 'sports' ? 'nav-link active' : 'nav-link'
                }
                href="#"
                role="tab"
                onClick={() => setActiveTab('sports')}
              >
                Sports
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  activeTab === 'casino' ? 'nav-link active' : 'nav-link'
                }
                href="#"
                role="tab"
                onClick={() => setActiveTab('casino')}
              >
                Casino
              </a>
            </li>
          </ul>
        </div>
        <div className="report-page-count">
          <div className="bet-types-container">
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="soda-all"
                name="betType"
                value="all"
                className="custom-control-input"
              />
              <Label for="soda-all" className="custom-bet-label">
                All
              </Label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="soda-back"
                name="betType"
                value="back"
                className="custom-control-input"
              />
              <Label for="soda-back" className="custom-bet-label">
                Back
              </Label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="soda-lay"
                name="betType"
                value="lay"
                className="custom-control-input"
              />
              <Label for="soda-lay" className="custom-bet-label">
                Lay
              </Label>
            </div>
          </div>
          <div className="custom-control-inline">
            <div>
              Total Bets: <span className="mr-2">0</span> Total Amount:
              <span>0</span>
            </div>
          </div>
          <div className="file-icons">
            <div>
              <img src="images/pdf.png" alt="pdf" />
            </div>
            <div id="export_1694411267194">
              <img src="images/pdfx.png" alt="pdf" />
            </div>
          </div>
        </div>
        <div className="report-table table-responsive">
          <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalPages}
            onChangePage={handlePageChange}
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentBetPageContent;
