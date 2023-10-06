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
import { postRequest } from '../../../../api';
import ExportToExcel from '../../../../helper/export-excel';

function NotificationPageContent() {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const columns = [
    {
      name: 'S.No',
      selector: (row, index) => index + 1,
    },
    {
      name: 'Settle Time',
      selector: (row) =>
        row.matchDateTime ? moment(row.matchDateTime).format('DD-MM-YYYY') : '',
    },
    {
      name: 'Event Name',
      selector: (row) => row.name,
    },
    {
      name: 'P/L',
      selector: (row) => row.pl,
    },
    {
      name: 'Show Details',
    },
  ];

  const onExportData = () => {
    const exportData = data.map((item, i) => ({
      'Sr No': i + 1,
      'Settle Time': item.matchDateTime
        ? moment(item.matchDateTime).format('DD-MM-YYYY')
        : '',
      'Event Name': item.name,
      'P/L': item.pl,
    }));
    ExportToExcel(exportData, 'notification');
  };
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Sr No', 'Settle Time', 'Event Name', 'P/L']],
      body: data.map((item, index) => [
        index + 1,
        item.matchDateTime
          ? moment(item.matchDateTime).format('DD-MM-YYYY')
          : '',
        item.name,
        item.pl,
      ]),
    });
    doc.save(`notification.pdf`);
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
      startDate,
      endDate,
    };
    const result = await postRequest('event/completedEventList', body);
    if (result?.success) {
      setData(result?.data?.details || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNotificationDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <LoadingOverlay />
  ) : (
    <div className="comman-bg mb-0">
      <div className="report-box">
        <div className="report-title">
          <div className="report-name">Notification</div>
        </div>
        <div className="report-form">
          <div className="form-group">
            <Label>From</Label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <Label>To</Label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn custom-buttton py-1"
              disabled={!startDate || !endDate}
              onClick={() => getNotificationDetail()}
            >
              Apply
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
