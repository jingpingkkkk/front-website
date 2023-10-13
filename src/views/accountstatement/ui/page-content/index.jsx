/* eslint-disable prefer-template */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable new-cap */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import 'jspdf-autotable';
import DataTable from 'react-data-table-component';
import { Label } from 'reactstrap';
import moment from 'moment';
import jsPDF from 'jspdf';
import LoadingOverlay from '../../../../components/common/loading-overlay';
import accountType from './data';
import { postRequest } from '../../../../api';
import ExportToExcel from '../../../../helper/export-excel';

function AccountStatementPageContent() {
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [type, setType] = useState(accountType[0]);
  const columns = [
    {
      name: 'Date',
      selector: (row) =>
        row.createdAt ? moment(row.createdAt).format('DD-MM-YYYY') : '',
    },
    {
      name: 'Sr no',
      selector: (row, index) => (currentPage - 1) * perPage + (index + 1),
    },
    {
      name: 'Credit',
      selector: (row) => row.points,
      cell: (row) => (
        <div style={{ color: 'green' }}>
          {row.type === 'credit' ? row.points : ''}
        </div>
      ),
    },
    {
      name: 'Debit',
      selector: (row) => row.points,
      cell: (row) => (
        <div style={{ color: 'red' }}>
          {row.type === 'debit' ? '-' + row.points : ''}
        </div>
      ),
    },
    {
      name: 'Remark',
      selector: (row) => row.remark,
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setLoading(true);
    setPerPage(newPerPage);
    setLoading(false);
  };
  const onExportData = () => {
    const exportData = data.map((item, i) => ({
      Date: item.createdAt ? moment(item.createdAt).format('DD-MM-YYYY') : '',
      'Sr No': i + 1,
      Credit: item.type === 'credit' ? item.points : '',
      Debit: item.type === 'debit' ? '-' + item.points : '',
      Remark: item.remark,
    }));
    ExportToExcel(exportData, 'accountStatement');
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Date', 'Sr No', 'Credit', 'Debit', 'Remark']],
      body: data.map((item, index) => [
        item.createdAt ? moment(item.createdAt).format('DD-MM-YYYY') : '',
        index + 1,
        item.type === 'credit' ? item.points : '',
        item.type === 'debit' ? '-' + item.points : '',
        item.remark,
      ]),
    });
    doc.save(`accountStatement.pdf`);
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

  const getNotificationDetail = async () => {
    setLoading(true);
    const body = {
      page: currentPage,
      perPage,
      fromDate,
      toDate,
      type,
      searchQuery: searchText,
    };
    const result = await postRequest(
      'transactionActivity/getAllTransactionActivity',
      body,
    );
    if (result?.success) {
      setData(result?.data?.details || []);
      setTotalRows(result?.data?.totalRecords || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNotificationDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, currentPage, perPage]);

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
        <div className="report-form date-filter">
          <div className="form-group from-date">
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
          <div className="form-group to-date">
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
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
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
                className="bg-transparent file-icon"
                onClick={exportToPDF}
                disabled={!data?.length}
              >
                <img src="images/pdf.png" alt="pdf" />
              </button>
            </div>
            <div id="export_1694411267194">
              <button
                type="button"
                className="bg-transparent file-icon"
                onClick={onExportData}
                disabled={!data?.length}
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
                highlightOnHover
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
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
