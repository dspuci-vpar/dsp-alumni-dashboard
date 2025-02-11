import { useState } from 'react';
import * as XLSX from 'xlsx';

const ExportButton = ({ data }: { data: Alumni[] }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, "Alumni");
      XLSX.writeFile(wb, "alumni-export.xlsx");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button 
      onClick={handleExport}
      disabled={isExporting}
      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
    >
      {isExporting ? "Exporting..." : "Export to Excel"}
    </button>
  );
}; 