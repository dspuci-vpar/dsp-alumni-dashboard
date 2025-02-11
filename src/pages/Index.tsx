import { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";
import DataTable from "@/components/DataTable";
import SearchBar from "@/components/SearchBar";
import DistributionCharts from "@/components/DistributionCharts";
import { motion } from "framer-motion";
import StatsSummary from "@/components/StatsSummary";
import { Linkedin, Instagram, Globe } from "lucide-react";

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
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Explore where our alumni are making an impact
            </p>
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://www.linkedin.com/company/delta-sigma-pi---pi-sigma-chapter/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://www.instagram.com/dspuci/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.dspuci.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
              >
                <Globe size={24} />
              </a>
            </div>
          </header>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <StatsSummary data={data} />
          </motion.div>

          <div className="mb-8">
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
            <div className="mb-4">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            <DataTable searchQuery={searchQuery} data={data} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
