import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo } from "react";
import { TrendingUp, Building2 } from "lucide-react";
import CompanyLogo, { getCompanyLogoUrl } from "./CompanyLogo";

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

interface DistributionChartsProps {
  data: Alumni[];
}

const TOP_INDUSTRIES_COUNT = 12;

const DistributionCharts = ({ data }: DistributionChartsProps) => {
  const companyDistribution = useMemo(() => {
    const distribution = data.reduce((acc, alumni) => {
      if (!alumni.Company || alumni.Company.trim() === '') {
        return acc;
      }
      
      acc[alumni.Company] = (acc[alumni.Company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(distribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([company, count]) => ({
        name: company,
        value: count,
      }));
  }, [data]);

  const industryDistribution = useMemo(() => {
    const distribution = data.reduce((acc, alumni) => {
      if (!alumni.Industry || alumni.Industry.trim() === '') {
        return acc;
      }
      
      acc[alumni.Industry] = (acc[alumni.Industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sorted = Object.entries(distribution)
      .sort(([, a], [, b]) => b - a);

    const total = sorted.reduce((sum, [, count]) => sum + count, 0);

    const top = sorted.slice(0, TOP_INDUSTRIES_COUNT);
    const rest = sorted.slice(TOP_INDUSTRIES_COUNT);
    const otherCount = rest.reduce((sum, [, count]) => sum + count, 0);

    const result = top.map(([industry, count]) => ({
      name: industry,
      value: count,
      percent: total > 0 ? ((count / total) * 100) : 0,
    }));

    if (otherCount > 0) {
      result.push({
        name: `Other (${rest.length})`,
        value: otherCount,
        percent: total > 0 ? ((otherCount / total) * 100) : 0,
      });
    }

    return result;
  }, [data]);

  const CompanyTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const companyName = payload[0].payload.name;
      return (
        <div className="bg-neutral-950 dark:bg-neutral-100 px-3 py-2.5 border border-neutral-800 dark:border-cream-200 flex items-center gap-2.5">
          <img
            src={getCompanyLogoUrl(companyName, 64)}
            alt=""
            className="w-6 h-6 rounded-sm object-contain bg-white"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div>
            <p className="font-medium text-sm text-neutral-100 dark:text-neutral-950">{companyName}</p>
            <p className="text-xs text-taupe-300 dark:text-taupe-700 font-mono mt-0.5">
              {payload[0].value} {payload[0].value === 1 ? 'alumnus' : 'alumni'}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom X-axis tick that renders company logo + name
  const CompanyTick = ({ x, y, payload }: any) => {
    const logoUrl = getCompanyLogoUrl(payload.value, 64);
    return (
      <g transform={`translate(${x},${y})`}>
        <rect
          x={-12}
          y={4}
          width={24}
          height={24}
          rx={3}
          fill="white"
          stroke="#e5e2db"
          strokeWidth={0.5}
        />
        <image
          href={logoUrl}
          x={-10}
          y={6}
          width={20}
          height={20}
          style={{ borderRadius: 2 }}
        />
        <text
          x={0}
          y={36}
          textAnchor="middle"
          fill="currentColor"
          fontSize={10}
          fontFamily="Inter"
        >
          {payload.value.length > 12 ? payload.value.slice(0, 11) + '…' : payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className="divide-y divide-cream-200 dark:divide-neutral-800">
      {/* Company Distribution */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-5 h-5 text-taupe-400 dark:text-taupe-600" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-100">
            Top Companies
          </h3>
        </div>
        {companyDistribution.length > 0 ? (
          <div className="h-[350px] bg-cream-50 dark:bg-neutral-950 border border-cream-200 dark:border-neutral-800 px-3 pt-2 pb-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companyDistribution} margin={{ top: 5, right: 15, left: 5, bottom: 10 }}>
                <XAxis 
                  dataKey="name" 
                  height={60}
                  tick={<CompanyTick />}
                  stroke="currentColor"
                  strokeWidth={1}
                  interval={0}
                />
                <YAxis 
                  tick={{ fill: 'currentColor', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  stroke="currentColor"
                  strokeWidth={1}
                  width={28}
                />
                <Tooltip content={<CompanyTooltip />} cursor={{ fill: 'rgba(182, 176, 159, 0.1)' }} />
                <Bar 
                  dataKey="value" 
                  fill="#B6B09F"
                  radius={[0, 0, 0, 0]}
                  animationDuration={0}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center text-taupe-500 dark:text-taupe-500 py-12 text-sm">
            No company data available
          </div>
        )}
      </div>

      {/* Industry Distribution - Horizontal Bar Chart */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-5 h-5 text-taupe-400 dark:text-taupe-600" strokeWidth={2} />
          <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-100">
            Industry Distribution
          </h3>
        </div>
        {industryDistribution.length > 0 ? (
          <div className="space-y-1.5">
            {industryDistribution.map((item) => {
              const maxValue = industryDistribution[0]?.value || 1;
              const barWidth = (item.value / maxValue) * 100;
              const isOther = item.name.startsWith('Other (');
              return (
                <div key={item.name} className="group flex items-center gap-3">
                  {/* Industry label */}
                  <div className="w-40 flex-shrink-0 text-right">
                    <span
                      className={`text-[13px] leading-tight block truncate ${
                        isOther
                          ? 'text-taupe-400 dark:text-taupe-500 italic'
                          : 'text-taupe-700 dark:text-taupe-400'
                      }`}
                      title={item.name}
                    >
                      {item.name}
                    </span>
                  </div>
                  {/* Bar */}
                  <div className="flex-1 h-6 bg-cream-200 dark:bg-neutral-800/50 rounded-sm overflow-hidden">
                    <div
                      className={`h-full rounded-sm transition-all duration-300 ${
                        isOther
                          ? 'bg-cream-400 dark:bg-neutral-600'
                          : 'bg-taupe-500 dark:bg-taupe-500 group-hover:bg-taupe-600 dark:group-hover:bg-taupe-400'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  {/* Count & Percentage */}
                  <div className="w-[4.5rem] flex-shrink-0 text-right tabular-nums">
                    <span className="text-[13px] font-mono font-medium text-neutral-900 dark:text-neutral-200">
                      {item.value}
                    </span>
                    <span className="text-[11px] font-mono text-taupe-400 dark:text-taupe-500 ml-1">
                      {item.percent.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-taupe-500 dark:text-taupe-500 py-12 text-sm">
            No industry data available
          </div>
        )}
      </div>
    </div>
  );
};

export default DistributionCharts;
