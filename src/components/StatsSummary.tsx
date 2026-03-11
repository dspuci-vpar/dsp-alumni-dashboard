import { useMemo } from 'react';
import { Users, Building2, Briefcase } from 'lucide-react';

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

interface StatsSummaryProps {
  data: Alumni[];
}

const StatsSummary = ({ data }: StatsSummaryProps) => {
  const stats = useMemo(() => ({
    totalAlumni: data.length,
    uniqueCompanies: new Set(data.map(a => a.Company).filter(c => c && c.trim())).size,
    uniqueIndustries: new Set(data.map(a => a.Industry).filter(i => i && i.trim())).size,
  }), [data]);

  const statCards = [
    {
      icon: Users,
      label: "Total Alumni",
      value: stats.totalAlumni,
    },
    {
      icon: Building2,
      label: "Companies",
      value: stats.uniqueCompanies,
    },
    {
      icon: Briefcase,
      label: "Industries",
      value: stats.uniqueIndustries,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cream-200 dark:bg-neutral-800 border border-cream-200 dark:border-neutral-800">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className="bg-neutral-100 dark:bg-neutral-900 p-6 group hover:bg-cream-200 dark:hover:bg-neutral-800 transition-colors duration-150"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <stat.icon 
                  className="w-4 h-4 text-taupe-400 dark:text-taupe-600" 
                  strokeWidth={2}
                />
                <span className="text-xs font-medium text-taupe-700 dark:text-taupe-400 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <div className="text-3xl font-semibold text-neutral-950 dark:text-neutral-100 font-mono tabular-nums">
                {stat.value.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSummary; 