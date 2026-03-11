import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Linkedin, Search, ArrowUp, ArrowDown } from "lucide-react";
import Badge from "./Badge";
import CompanyLogo from "./CompanyLogo";

interface DataTableProps {
  searchQuery: string;
  data: Alumni[];
}

type Alumni = {
  Name: string;
  Class: string;
  Family: string;
  Industry: string;
  Company: string;
  Linkedin: string;
  Title: string;
};

const columnHelper = createColumnHelper<Alumni>();

const columns = [
  columnHelper.accessor("Name", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors group -ml-2 px-2 py-1"
        onClick={() => column.toggleSorting()}
      >
        <span>Name</span>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" strokeWidth={2} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-3 w-3" strokeWidth={2} />
        ) : null}
      </button>
    ),
    cell: (info) => (
      <div className="font-medium text-neutral-950 dark:text-neutral-100">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("Class", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors group -ml-2 px-2 py-1"
        onClick={() => column.toggleSorting()}
      >
        <span>Class</span>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" strokeWidth={2} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-3 w-3" strokeWidth={2} />
        ) : null}
      </button>
    ),
    cell: (info) => (
      <Badge variant="info">{info.getValue()}</Badge>
    ),
  }),
  columnHelper.accessor("Family", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors group -ml-2 px-2 py-1"
        onClick={() => column.toggleSorting()}
      >
        <span>Family</span>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" strokeWidth={2} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-3 w-3" strokeWidth={2} />
        ) : null}
      </button>
    ),
    cell: (info) => (
      <Badge variant="purple">{info.getValue()}</Badge>
    ),
  }),
  columnHelper.accessor("Industry", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors group -ml-2 px-2 py-1"
        onClick={() => column.toggleSorting()}
      >
        <span>Role/Industry</span>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" strokeWidth={2} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-3 w-3" strokeWidth={2} />
        ) : null}
      </button>
    ),
    cell: (info) => (
      <Badge variant="primary">{info.getValue()}</Badge>
    ),
  }),
  columnHelper.accessor("Company", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors group -ml-2 px-2 py-1"
        onClick={() => column.toggleSorting()}
      >
        <span>Company</span>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" strokeWidth={2} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-3 w-3" strokeWidth={2} />
        ) : null}
      </button>
    ),
    cell: (info) => {
      const company = info.getValue();
      return (
        <div className="flex items-center gap-2.5 font-medium text-taupe-800 dark:text-taupe-300">
          <CompanyLogo company={company} size={22} />
          <span>{company}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("Title", {
    header: ({ column }) => (
      <button
        className="flex items-center gap-2 hover:text-neutral-950 dark:hover:text-neutral-100 transition-colors group -ml-2 px-2 py-1"
        onClick={() => column.toggleSorting()}
      >
        <span>Title</span>
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" strokeWidth={2} />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-3 w-3" strokeWidth={2} />
        ) : null}
      </button>
    ),
    cell: (info) => (
      <div className="text-taupe-700 dark:text-taupe-400 text-sm">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("Linkedin", {
    header: "LinkedIn",
    cell: (info) => {
      const linkedinUrl = info.getValue();
      if (!linkedinUrl) return null;

      return (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-taupe-600 hover:text-neutral-950 dark:hover:text-neutral-100 inline-flex items-center transition-colors"
          aria-label="View LinkedIn profile"
        >
          <Linkedin size={18} strokeWidth={2} />
        </a>
      );
    },
  }),
];

const DataTable = ({ searchQuery, data }: DataTableProps) => {
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
    globalFilterFn: (row, columnId, filterValue) => {
      const value = String(row.getValue(columnId));
      return value.toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  const hasResults = table.getRowModel().rows.length > 0;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-cream-200 dark:border-neutral-800">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left px-4 py-3 text-xs font-medium text-taupe-700 dark:text-taupe-400 uppercase tracking-wider bg-cream-50 dark:bg-neutral-900"
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
        <tbody className="divide-y divide-cream-200 dark:divide-neutral-800">
          {hasResults ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="group hover:bg-cream-50 dark:hover:bg-neutral-900 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-16 text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 bg-cream-200 dark:bg-neutral-800 flex items-center justify-center">
                    <Search className="w-6 h-6 text-taupe-400" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-neutral-950 dark:text-neutral-100 mb-1">
                      No alumni found
                    </h3>
                    <p className="text-xs text-taupe-500 dark:text-taupe-500">
                      Try adjusting your search query
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Results count */}
      {hasResults && (
        <div className="px-4 py-3 border-t border-cream-200 dark:border-neutral-800 bg-cream-50 dark:bg-neutral-900">
          <p className="text-xs text-taupe-700 dark:text-taupe-400 font-mono">
            {table.getRowModel().rows.length} {table.getRowModel().rows.length === 1 ? 'result' : 'results'}
          </p>
        </div>
      )}
    </div>
  );
};

export default DataTable;
