import { useState } from 'react';
import { Download, FileSpreadsheet, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';

type Alumni = {
  Name: string;
  Class: string;
  Family: string;
  Region?: string;
  Industry: string;
  Company: string;
  Linkedin: string;
  Title: string;
};

interface ExportButtonProps {
  data: Alumni[];
  filteredData?: Alumni[];
}

const ExportButton = ({ data, filteredData }: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const exportData = filteredData && filteredData.length > 0 ? filteredData : data;

  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      // Convert data to CSV format
      const headers = ['Name', 'Class', 'Family', 'Industry', 'Company', 'Title', 'LinkedIn'];
      const csvRows = [
        headers.join(','),
        ...exportData.map(row => [
          `"${row.Name || ''}"`,
          `"${row.Class || ''}"`,
          `"${row.Family || ''}"`,
          `"${row.Industry || ''}"`,
          `"${row.Company || ''}"`,
          `"${row.Title || ''}"`,
          `"${row.Linkedin || ''}"`,
        ].join(','))
      ];
      
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `dsp-alumni-export-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setShowMenu(false);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportExcel = () => {
    setIsExporting(true);
    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);
      XLSX.utils.book_append_sheet(wb, ws, "Alumni");
      XLSX.writeFile(wb, `dsp-alumni-export-${new Date().toISOString().split('T')[0]}.xlsx`);
      setShowMenu(false);
    } catch (error) {
      console.error('Error exporting Excel:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowMenu(!showMenu)}
        disabled={isExporting}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-950 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 border border-cream-200 dark:border-neutral-800 hover:bg-cream-200 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="w-4 h-4" strokeWidth={2} />
        {isExporting ? "Exporting..." : "Export"}
      </button>
      
      {showMenu && !isExporting && (
        <>
          {/* Backdrop to close menu */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowMenu(false)}
          />
          
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-neutral-100 dark:bg-neutral-900 border border-cream-200 dark:border-neutral-800 shadow-lg z-20">
            <div className="py-1">
              <button
                onClick={handleExportCSV}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-950 dark:text-neutral-100 hover:bg-cream-200 dark:hover:bg-neutral-800 transition-colors text-left"
              >
                <FileText className="w-4 h-4" strokeWidth={2} />
                <div>
                  <div className="font-medium">Export as CSV</div>
                  <div className="text-xs text-taupe-500 dark:text-taupe-500">
                    {exportData.length} {exportData.length === 1 ? 'record' : 'records'}
                  </div>
                </div>
              </button>
              
              <button
                onClick={handleExportExcel}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-950 dark:text-neutral-100 hover:bg-cream-200 dark:hover:bg-neutral-800 transition-colors text-left border-t border-cream-200 dark:border-neutral-800"
              >
                <FileSpreadsheet className="w-4 h-4" strokeWidth={2} />
                <div>
                  <div className="font-medium">Export as Excel</div>
                  <div className="text-xs text-taupe-500 dark:text-taupe-500">
                    {exportData.length} {exportData.length === 1 ? 'record' : 'records'}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportButton; 