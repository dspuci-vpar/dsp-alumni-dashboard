
import { motion } from "framer-motion";
import { Filter } from "lucide-react";

interface FiltersProps {
  filters: {
    class: string;
    family: string;
    region: string;
    industry: string;
    company: string;
  };
  onFilterChange: (filters: any) => void;
}

const Filters = ({ filters, onFilterChange }: FiltersProps) => {
  const filterOptions = {
    class: ["2020", "2021", "2022", "2023"],
    family: ["Engineering", "Business", "Arts", "Science"],
    region: ["North America", "Europe", "Asia", "Others"],
    industry: ["Technology", "Finance", "Healthcare", "Education"],
    company: ["Google", "Microsoft", "Apple", "Amazon"],
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
        {Object.entries(filterOptions).map(([key, options]) => (
          <div key={key} className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
              {key}
            </label>
            <select
              value={filters[key as keyof typeof filters]}
              onChange={(e) =>
                onFilterChange({ ...filters, [key]: e.target.value })
              }
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            >
              <option value="">All</option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Filters;
