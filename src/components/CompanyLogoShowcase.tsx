import { useMemo } from "react";
import { Building2 } from "lucide-react";
import CompanyLogo from "./CompanyLogo";

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

interface CompanyLogoShowcaseProps {
  data: Alumni[];
}

const CompanyLogoShowcase = ({ data }: CompanyLogoShowcaseProps) => {
  const topCompanies = useMemo(() => {
    const distribution = data.reduce((acc, alumni) => {
      if (!alumni.Company || alumni.Company.trim() === "") return acc;
      acc[alumni.Company] = (acc[alumni.Company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(distribution)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 15)
      .map(([company, count]) => ({ company, count }));
  }, [data]);

  if (topCompanies.length === 0) return null;

  return (
    <section className="bg-neutral-100 dark:bg-neutral-900 border border-cream-200 dark:border-neutral-800">
      <div className="px-6 py-4 border-b border-cream-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <Building2
            className="w-5 h-5 text-taupe-400 dark:text-taupe-600"
            strokeWidth={2}
          />
          <h3 className="text-lg font-semibold text-neutral-950 dark:text-neutral-100">
            Where Our Alumni Work
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center justify-center gap-6">
          {topCompanies.map(({ company, count }) => (
            <div
              key={company}
              className="group flex flex-col items-center gap-2 px-4 py-3 rounded-sm hover:bg-cream-50 dark:hover:bg-neutral-800 transition-colors duration-150 cursor-default"
              title={`${company} — ${count} ${count === 1 ? "alumnus" : "alumni"}`}
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-sm border border-cream-200 dark:border-neutral-700 p-1.5 group-hover:border-taupe-400 dark:group-hover:border-taupe-500 transition-colors duration-150 group-hover:shadow-sm">
                <CompanyLogo
                  company={company}
                  size={36}
                  className="rounded-sm"
                />
              </div>
              <div className="text-center">
                <p className="text-[11px] font-medium text-taupe-700 dark:text-taupe-400 leading-tight max-w-[80px] truncate">
                  {company}
                </p>
                <p className="text-[10px] font-mono text-taupe-400 dark:text-taupe-600 mt-0.5">
                  {count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogoShowcase;

