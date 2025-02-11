import { useMemo } from 'react';
import { Users, Building2, Briefcase } from 'lucide-react';

interface StatsSummaryProps {
  data: Alumni[];
}

const StatsSummary = ({ data }: StatsSummaryProps) => {
  const stats = useMemo(() => ({
    totalAlumni: data.length,
    uniqueCompanies: new Set(data.map(a => a.Company)).size,
    uniqueIndustries: new Set(data.map(a => a.Industry)).size,
  }), [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Alumni</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalAlumni}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Companies</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.uniqueCompanies}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Industries</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.uniqueIndustries}</p>
      </div>
    </div>
  );
};

export default StatsSummary; 