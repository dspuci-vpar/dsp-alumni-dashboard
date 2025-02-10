
import { useState } from "react";
import DataTable from "@/components/DataTable";
import MapVisualization from "@/components/MapVisualization";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import DistributionCharts from "@/components/DistributionCharts";
import { motion } from "framer-motion";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    class: "",
    family: "",
    region: "",
    industry: "",
    company: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
              Alumni Network
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Explore where our alumni are making an impact
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-6"
            >
              <SearchBar onSearch={setSearchQuery} />
              <Filters filters={filters} onFilterChange={setFilters} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-6"
            >
              <DistributionCharts />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-6 mb-8"
          >
            <MapVisualization />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-6"
          >
            <DataTable searchQuery={searchQuery} filters={filters} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
