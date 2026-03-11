import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import DataTable from "@/components/DataTable";
import SearchBar from "@/components/SearchBar";
import DistributionCharts from "@/components/DistributionCharts";
import StatsSummary from "@/components/StatsSummary";
import ThemeToggle from "@/components/ThemeToggle";
import LoadingSkeleton from "@/components/LoadingSkeleton";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadExcelData = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    loadExcelData();
  }, []);

  const socialLinks = [
    { 
      icon: Linkedin, 
      url: "https://www.linkedin.com/company/delta-sigma-pi---pi-sigma-chapter/",
      label: "LinkedIn"
    },
    { 
      icon: Instagram, 
      url: "https://www.instagram.com/dspuci/",
      label: "Instagram"
    },
    { 
      icon: Globe, 
      url: "https://www.dspuci.com/",
      label: "Website"
    },
  ];
  
  return (
    <div className="min-h-screen bg-cream-100 dark:bg-neutral-950">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Header - Compact and functional */}
          <header className="border-b border-cream-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Logo - Simple, no animations */}
                  <div className="w-12 h-12 bg-neutral-950 dark:bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-semibold text-neutral-100 dark:text-neutral-950 font-mono">ΔΣΠ</span>
                  </div>
                  
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-neutral-100 mb-1">
                      Delta Sigma Pi — Pi Sigma
                    </h1>
                    <p className="text-sm text-taupe-700 dark:text-taupe-400">
                      Alumni Network Dashboard
                    </p>
                  </div>
                </div>
                
                {/* Social Links - Minimal */}
                <div className="flex items-center gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-taupe-700 dark:text-taupe-400 hover:text-neutral-950 dark:hover:text-neutral-100 hover:bg-cream-200 dark:hover:bg-neutral-800 transition-colors duration-150"
                      aria-label={link.label}
                      title={link.label}
                    >
                      <link.icon size={18} strokeWidth={2} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
            {/* Stats Summary */}
            <StatsSummary data={data} />

            {/* Charts Section */}
            <section className="bg-neutral-100 dark:bg-neutral-900 border border-cream-200 dark:border-neutral-800">
              <DistributionCharts data={data} />
            </section>

            {/* Data Table Section */}
            <section className="bg-neutral-100 dark:bg-neutral-900 border border-cream-200 dark:border-neutral-800">
              <div className="border-b border-cream-200 dark:border-neutral-800 px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-neutral-950 dark:text-neutral-100">
                    Alumni Directory
                  </h2>
                  <span className="text-sm text-taupe-500 dark:text-taupe-500 font-mono">
                    {data.length} total
                  </span>
                </div>
                <SearchBar onSearch={setSearchQuery} />
              </div>
              <DataTable searchQuery={searchQuery} data={data} />
            </section>
          </main>
          
          {/* Footer - Minimal */}
          <footer className="border-t border-cream-200 dark:border-neutral-800 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <p className="text-xs text-taupe-500 dark:text-taupe-500">
                © 2024 Delta Sigma Pi - Pi Sigma Chapter
              </p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
