import { motion } from "framer-motion";
import { Filter } from "lucide-react";

interface FiltersProps {
  filters: {
    class: string;
    family: string;
    industry: string;
    company: string;
  };
  onFilterChange: (filters: FiltersProps["filters"]) => void;
  options: {
    class: string[];
    family: string[];
    industry: string[];
    company: string[];
  };
}

const Filters = ({ filters, onFilterChange, options }: FiltersProps) => {
  const handleFilterChange = (key: keyof typeof filters) => (value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Class
          </label>
          <select
            value={filters.class}
            onChange={(e) => handleFilterChange("class")(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
          >
            <option value="">All Classes</option>
            {options.class.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Family
          </label>
          <select
            value={filters.family}
            onChange={(e) => handleFilterChange("family")(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
          >
            <option value="">All Families</option>
            {options.family.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Industry
          </label>
          <select
            value={filters.industry}
            onChange={(e) => handleFilterChange("industry")(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
          >
            <option value="">All Industries</option>
            {options.industry.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company
          </label>
          <select
            value={filters.company}
            onChange={(e) => handleFilterChange("company")(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
          >
            <option value="">All Companies</option>
            {options.company.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default Filters;
