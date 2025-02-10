import { useState, useEffect } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import * as XLSX from "xlsx";

interface DataTableProps {
  searchQuery: string;
  filters: {
    class: string;
    family: string;
    region: string;
    industry: string;
    company: string;
  };
}

type Alumni = {
  Name: string;
  Class: string;
  Family: string;
  Region: string;
  Industry: string;
  Company: string;
  Linkedin: string;
  Title: string;
};

const columnHelper = createColumnHelper<Alumni>();

const columns = [
  columnHelper.accessor("Name", {
    header: "Name",
    cell: (info) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("Class", {
    header: "Class",
  }),
  columnHelper.accessor("Family", {
    header: "Family",
  }),
  columnHelper.accessor("Region", {
    header: "Region",
  }),
  columnHelper.accessor("Industry", {
    header: "Role/Industry",
  }),
  columnHelper.accessor("Company", {
    header: "Company",
  }),
  columnHelper.accessor("Title", {
    header: "Title",
  }),
  columnHelper.accessor("Linkedin", {
    header: "LinkedIn",
    cell: (info) => (
      <a
        href={info.getValue()}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
      >
        View Profile
        <ExternalLink size={16} />
      </a>
    ),
  }),
];

const DataTable = ({ searchQuery, filters }: DataTableProps) => {
  const [sorting, setSorting] = useState([]);
  const [data, setData] = useState<Alumni[]>([]);

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        console.log("Attempting to fetch Excel file...");
        const response = await fetch("/alumni-data.xlsx");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Excel file fetched successfully");

        const arrayBuffer = await response.arrayBuffer();
        console.log("File converted to array buffer");

        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        console.log("Workbook sheets:", workbook.SheetNames);

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Alumni[];
        console.log("Parsed Excel data:", jsonData);

        setData(jsonData);
      } catch (error) {
        console.error("Detailed error loading Excel file:", error);
      }
    };

    loadExcelData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: searchQuery,
    },
    onSortingChange: setSorting,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="overflow-x-auto"
    >
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DataTable;
