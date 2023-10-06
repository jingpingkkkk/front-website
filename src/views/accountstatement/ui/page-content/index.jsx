/* eslint-disable new-cap */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import 'jspdf-autotable';
import DataTable from 'react-data-table-component';
import { Label } from 'reactstrap';
import LoadingOverlay from '../../../../components/common/loading-overlay';
import accountType from './data';

function AccountStatementPageContent() {
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const totalPages = 10;
  console.log(currentPage);
  const data = [];
  const columns = [
    {
      name: 'Date',
    },
    {
      name: 'Sr no',
    },
    {
      name: 'Credit',
    },
    {
      name: 'Debit',
    },
    {
      name: 'Remark',
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
    console.log('Export Excel');
  };
  const exportToPDF = () => {
    console.log('Export PDF');
  };

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
    <div className="comman-bg">
      <div className="report-box">
        <div className="report-title mb-2">
          <div className="report-name">Account Statement</div>
          <div className="report-search search-box">
            <div className="form-group mb-0">
              <input
                type="text"
                placeholder="Search"
                className="form-control"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              <img
                src="./images/search.png"
                className="search-icon"
                alt="search"
              />
            </div>
          </div>
        </div>
        <div className="report-form">
          <div className="form-group">
            <Label>From</Label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <Label>To</Label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <Label>Type</Label>
            <select className="form-select">
              {accountType?.length
                ? accountType?.map((actype) => (
                    <option value={actype} key={actype}>
                      {actype}
                    </option>
                  ))
                : ''}
            </select>
          </div>
          <div className="form-group">
            <button type="button" className="btn custom-buttton py-1">
              Submit
            </button>
          </div>
        </div>
        <div className="report-page-count justify-content-end">
          <div className="file-icons">
            <div>
              <button
                type="button"
                className="bg-transparent"
                onClick={exportToPDF}
              >
                <img src="images/pdf.png" alt="pdf" />
              </button>
            </div>
            <div id="export_1694411267194">
              <button
                type="button"
                className="bg-transparent"
                onClick={onExportData}
              >
                <img src="images/pdfx.png" alt="pdf" />
              </button>
            </div>
          </div>
        </div>
        <div className="tab-content">
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
                onChangeRowsPerPage={(value) => handleRowsPerPageChange(value)}
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
      </div>
    </div>
  );
}

export default AccountStatementPageContent;
