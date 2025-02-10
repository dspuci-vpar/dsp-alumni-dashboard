import { useState, useEffect, useMemo } from "react";
import * as XLSX from 'xlsx';
import DataTable from "@/components/DataTable";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import DistributionCharts from "@/components/DistributionCharts";
import { motion } from "framer-motion";

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Alumni[]>([]);
  const [filters, setFilters] = useState({
    class: "",
    family: "",
    industry: "",
    company: "",
  });

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        const response = await fetch("/alumni-data.xlsx");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as Alumni[];
        setData(jsonData);
      } catch (error) {
        console.error("Error loading Excel file:", error);
      }
    };

    loadExcelData();
  }, []);

  // Generate unique options for each filter from the data
  const filterOptions = useMemo(() => {
    if (!data.length) return {
      class: [],
      family: [],
      industry: [],
      company: [],
    };

    return {
      class: Array.from(new Set(data.map(item => item.Class))).filter(Boolean).sort(),
      family: Array.from(new Set(data.map(item => item.Family))).filter(Boolean).sort(),
      industry: Array.from(new Set(data.map(item => item.Industry))).filter(Boolean).sort(),
      company: Array.from(new Set(data.map(item => item.Company))).filter(Boolean).sort(),
    };
  }, [data]);

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
              Delta Sigma Pi - Pi Sigma Alumni Network
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
              <Filters 
                filters={filters} 
                onFilterChange={setFilters}
                options={filterOptions}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-6"
            >
              <DistributionCharts data={data} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-6"
          >
            <DataTable 
              searchQuery={searchQuery} 
              filters={filters} 
              data={data}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
