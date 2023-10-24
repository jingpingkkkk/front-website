/* eslint-disable react/no-unstable-nested-components */
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Label } from 'reactstrap';
import { postRequest } from '../../../../api';
import LoadingOverlay from '../../../../components/common/loading-overlay';
import ExportToExcel from '../../../../helper/export-excel';
import accountType from './data';

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
      width: '150px',
      center: true,
    },
    {
      name: 'Sr. No.',
      selector: (row, index) => (currentPage - 1) * perPage + (index + 1),
      width: '100px',
      center: true,
    },
    {
      name: 'Credit',
      selector: (row) => row.points,
      cell: (row) => (
        <div className={`${row.points > 0 ? 'text-success' : ''} fw-semibold`}>
          {row.type === 'credit' ? row.points : '-'}
        </div>
      ),
      width: '250px',
      right: true,
    },
    {
      name: 'Debit',
      selector: (row) => row.points,
      cell: (row) => (
        <div className={`${row.points < 0 ? 'text-danger' : ''} fw-semibold`}>
          {row.type === 'debit' ? `-${row.points}` : '-'}
        </div>
      ),
      width: '250px',
      right: true,
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
      Debit: item.type === 'debit' ? `-${item.points}` : '',
      Remark: item.remark,
    }));
    ExportToExcel(exportData, 'accountStatement');
  };
  const exportToPDF = () => {
    const doc = new JsPDF();
    doc.autoTable({
      head: [['Date', 'Sr No', 'Credit', 'Debit', 'Remark']],
      body: data.map((item, index) => [
        item.createdAt ? moment(item.createdAt).format('DD-MM-YYYY') : '',
        index + 1,
        item.type === 'credit' ? item.points : '',
        item.type === 'debit' ? `-${item.points}` : '',
        item.remark,
      ]),
    });
    doc.save(`accountStatement.pdf`);
  };

  const customStyles = {
    table: {
      style: {
        border: '1px solid #e6e6e6',
        borderBottom: 'none',
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
        // backgroundColor: '#eeeeee',
        backgroundColor: 'white',
        color: '#1A1A1A',
        fontSize: '14px',
      },
    },
    pagination: {
      style: {
        // backgroundColor: '#e6e6e6',
        backgroundColor: 'whitesmoke',
        color: '#1A1A1A',
        fontSize: '14px',
      },
    },
  };

  const fetchTransactions = async () => {
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
      setData(result?.data?.records || []);
      setTotalRows(result?.data?.totalRecords || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
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
            <button
              type="button"
              className="btn custom-buttton py-1"
              onClick={fetchTransactions}
            >
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
