import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useMemo } from "react";

interface DistributionChartsProps {
  data: Alumni[];
}

const DistributionCharts = ({ data }: DistributionChartsProps) => {
  const companyDistribution = useMemo(() => {
    const distribution = data.reduce((acc, alumni) => {
      // Skip undefined, null, or empty company names
      if (!alumni.Company || alumni.Company.trim() === '') {
        return acc;
      }
      
      acc[alumni.Company] = (acc[alumni.Company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort by count
    return Object.entries(distribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10) // Top 10 companies
      .map(([company, count]) => ({
        name: company,
        value: count,
      }));
  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Company Distribution
        </h3>
        {companyDistribution.length > 0 ? (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companyDistribution}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#9b87f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No company data available
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DistributionCharts;
