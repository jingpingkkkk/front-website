/* eslint-disable new-cap */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Label } from 'reactstrap';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import DataTable from 'react-data-table-component';
import LoadingOverlay from '../../../../components/common/loading-overlay';
import { postRequest } from '../../../../api';
import ExportToExcel from '../../../../helper/export-excel';

function CurrentBetPageContent() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('sports');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [betType, setBetType] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [betStatus, setBetStatus] = useState('');

  const fetchCurrentBetsData = async () => {
    const item = JSON.parse(localStorage.getItem('user'));
    setLoading(true);
    try {
      const body = {
        loginUserId: item?._id,
        page: currentPage,
        perPage: rowsPerPage,
        betType,
        betResultStatus: betStatus,
      };
      const result = await postRequest('bet/getCurrentBetsUserwise', body);
      if (result?.success) {
        setData(result?.data?.details?.records || []);
        setTotalPages(result?.data?.details?.totalRecords);
        setTotalAmount(result?.data?.details?.totalAmount);
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
      name: 'User Rate',
      selector: (row) => row.odds,
    },
    {
      name: 'Amount	Placed',
      selector: (row) => row.stake,
    },
    {
      name: 'Result',
      selector: (row) => row.betResultStatus,
    },
  ];
  const casinoColumns = [
    {
      name: 'Event Name',
      selector: (row) => row.eventName,
    },
    {
      name: 'User Rate',
      selector: (row) => row.odds,
    },
    {
      name: 'Amount	Placed',
      selector: (row) => row.stake,
    },
    {
      name: 'Action',
    },
  ];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleRowsPerPageChange = (newPerPage) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(1);
  };
  const onExportData = () => {
    const exportData = data.map((item) => ({
      Sports: item.sportName,
      'Event Name': item.eventName,
      'Market Name': item.marketName,
      'User Rate': item.odds,
      'Amount Placed': item.stake,
      Result: item.betResultStatus,
    }));
    ExportToExcel(exportData, activeTab);
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          'Sports',
          'Event Name',
          'Market Name',
          'User Rate',
          'Amount Placed',
          'Result',
        ],
      ],
      body: data.map((item) => [
        item.sportName,
        item.eventName,
        item.marketName,
        item.odds,
        item.stake,
        item.betResultStatus,
      ]),
    });
    doc.save(`${activeTab}.pdf`);
  };
  const onChangeTab = (tab) => {
    setActiveTab(tab);
    setBetType('');
    setBetStatus('');
    if (tab === 'sports') {
      fetchCurrentBetsData();
    } else {
      setData([]);
      setTotalPages(0);
      setTotalAmount(0);
    }
  };

  useEffect(() => {
    fetchCurrentBetsData();
  }, [currentPage, betType, rowsPerPage, betStatus]);

  const customStyles = {
    table: {
      style: {
        border: '1px solid #e6e6e6',
        backgroundColor: '#2E3439',
        color: '#1A1A1A',
      },
    },
    headCells: {
      style: {
        backgroundColor: '#e6e6e6',
        color: '#1A1A1A',
        fontSize: '16px',
      },
    },
    rows: {
      style: {
        cursor: 'pointer',
        backgroundColor: '#eeeeee',
        color: '#1A1A1A',
        fontSize: '14px',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#e6e6e6',
        color: '#1A1A1A',
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
                onClick={() => {
                  onChangeTab('sports');
                }}
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
                onClick={() => {
                  onChangeTab('casino');
                }}
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
                value=""
                className="custom-control-input"
                checked={betType === ''}
                onChange={() => {
                  setBetType('');
                }}
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
                checked={betType === 'back'}
                onChange={() => {
                  setBetType('back');
                }}
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
                checked={betType === 'lay'}
                onChange={() => {
                  setBetType('lay');
                }}
              />
              <Label for="soda-lay" className="custom-bet-label">
                Lay
              </Label>
            </div>
          </div>
          <div className="bet-types-container">
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="bet-all"
                name="betStatus"
                value="all"
                className="custom-control-input"
                checked={betStatus === ''}
                onChange={() => {
                  setBetStatus('');
                }}
              />
              <Label for="bet-all" className="custom-bet-label">
                All
              </Label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="bet-running"
                name="betStatus"
                value="running"
                className="custom-control-input"
                checked={betStatus === 'running'}
                onChange={() => {
                  setBetStatus('running');
                }}
              />
              <Label for="bet-running" className="custom-bet-label">
                Running
              </Label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="bet-won"
                name="betStatus"
                value="won"
                className="custom-control-input"
                checked={betStatus === 'won'}
                onChange={() => {
                  setBetStatus('won');
                }}
              />
              <Label for="bet-won" className="custom-bet-label">
                Won
              </Label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="bet-lost"
                name="betStatus"
                value="lost"
                className="custom-control-input"
                checked={betStatus === 'lost'}
                onChange={() => {
                  setBetStatus('lost');
                }}
              />
              <Label for="bet-lost" className="custom-bet-label">
                Lost
              </Label>
            </div>
          </div>
          <div className="custom-control-inline">
            <div>
              Total Bets: <span className="mr-2">{totalPages || 0}</span> Total
              Amount:
              <span>{totalAmount}</span>
            </div>
          </div>
          <div className="file-icons">
            <div>
              <button
                type="button"
                className="bg-transparent"
                onClick={exportToPDF}
                disabled={!data?.length}
              >
                <img src="images/pdf.png" alt="pdf" />
              </button>
            </div>
            <div id="export_1694411267194">
              <button
                type="button"
                className="bg-transparent"
                onClick={onExportData}
                disabled={!data?.length}
              >
                <img src="images/pdfx.png" alt="pdf" />
              </button>
            </div>
          </div>
        </div>
        <div className="tab-content">
          {activeTab === 'sports' ? (
            <div
              role="tabpanel"
              className="tab-pane fade in active"
              id="sports"
            >
              <div className="report-table table-responsive">
                {data.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalPages}
                    onChangePage={(page) => handlePageChange(page)}
                    onChangeRowsPerPage={(value) =>
                      handleRowsPerPageChange(value)
                    }
                    paginationPerPage={rowsPerPage}
                    customStyles={customStyles}
                  />
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        {columns.map((column) => (
                          <th
                            key={column.name}
                            style={{
                              backgroundColor: '#e6e6e6',
                              color: '#1A1A1A',
                              fontSize: '16px',
                              height: '52px',
                              verticalAlign: 'middle',
                            }}
                          >
                            {column.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          colSpan={columns.length}
                          style={{
                            backgroundColor: '#eeeeee',
                            color: '#1A1A1A',
                            fontSize: '14px',
                            height: '52px',
                            verticalAlign: 'middle',
                          }}
                        >
                          No records found
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            <div
              role="tabpanel"
              className="tab-pane fade in active"
              id="casino"
            >
              <div className="report-table table-responsive">
                {data.length > 0 ? (
                  <DataTable
                    columns={casinoColumns}
                    data={data}
                    progressPending={loading}
                    pagination
                    paginationServer
                    paginationTotalRows={totalPages}
                    onChangePage={(page) => handlePageChange(page)}
                    onChangeRowsPerPage={(value) =>
                      handleRowsPerPageChange(value)
                    }
                    paginationPerPage={rowsPerPage}
                    customStyles={customStyles}
                  />
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        {casinoColumns.map((column) => (
                          <th
                            key={column.name}
                            style={{
                              backgroundColor: '#e6e6e6',
                              color: '#1A1A1A',
                              fontSize: '16px',
                              height: '52px',
                              verticalAlign: 'middle',
                            }}
                          >
                            {column.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td
                          colSpan={casinoColumns.length}
                          style={{
                            backgroundColor: '#eeeeee',
                            color: '#1A1A1A',
                            fontSize: '14px',
                            height: '52px',
                            verticalAlign: 'middle',
                          }}
                        >
                          No records found
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentBetPageContent;
