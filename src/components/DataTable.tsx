
import { useState } from "react";
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
  name: string;
  class: string;
  family: string;
  region: string;
  role: string;
  company: string;
  linkedin: string;
  title: string;
};

const columnHelper = createColumnHelper<Alumni>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => (
      <div className="font-medium text-gray-900 dark:text-white">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("class", {
    header: "Class",
  }),
  columnHelper.accessor("family", {
    header: "Family",
  }),
  columnHelper.accessor("region", {
    header: "Region",
  }),
  columnHelper.accessor("role", {
    header: "Role/Industry",
  }),
  columnHelper.accessor("company", {
    header: "Company",
  }),
  columnHelper.accessor("title", {
    header: "Title",
  }),
  columnHelper.accessor("linkedin", {
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

// Sample data - replace with your actual data
const data: Alumni[] = [
  {
    name: "John Doe",
    class: "2023",
    family: "Engineering",
    region: "North America",
    role: "Software Engineering",
    company: "Google",
    linkedin: "https://linkedin.com/in/johndoe",
    title: "Senior Software Engineer",
  },
  // Add more sample data here
];

const DataTable = ({ searchQuery, filters }: DataTableProps) => {
  const [sorting, setSorting] = useState([]);

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
