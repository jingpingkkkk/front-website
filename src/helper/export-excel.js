import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ExportToExcel = (data, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });
  const dataBlob = new Blob([excelBuffer], {
    type: 'application/octet-stream',
  });
  FileSaver.saveAs(dataBlob, `${fileName}.xlsx`);
};
export default ExportToExcel;
