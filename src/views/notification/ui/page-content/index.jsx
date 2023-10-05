/* eslint-disable new-cap */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import 'jspdf-autotable';
import DataTable from 'react-data-table-component';
import { Label } from 'reactstrap';
import LoadingOverlay from '../../../../components/common/loading-overlay';

function NotificationPageContent() {
  const [loading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [date, setDate] = useState('');
  const totalPages = 10;
  console.log(currentPage);
  const data = [];
  const columns = [
    {
      name: 'S.No',
    },
    {
      name: 'Settle Time',
    },
    {
      name: 'Event Name',
    },
    {
      name: 'P/L',
    },
    {
      name: 'Show Details',
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
    <div className="comman-bg mb-0">
      <div className="report-box">
        <div className="report-title">
          <div className="report-name">Notification</div>
        </div>
        <div className="report-page-count">
          <div className="bet-types-container">
            <div className="custom-control custom-radio custom-control-inline align-items-center">
              <Label for="soda-all" className="me-2 mb-0">
                Date:
              </Label>
              <input
                type="date"
                id="soda-all"
                name="betType"
                value={date}
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
              />
              <button type="button" className="btn custom-buttton py-1 ms-2">
                Apply
              </button>
            </div>
          </div>
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

export default NotificationPageContent;
