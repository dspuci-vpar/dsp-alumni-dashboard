interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'purple' | 'pink' | 'orange';
}

const Badge = ({ children, variant = 'default' }: BadgeProps) => {
  const variants = {
    default: "bg-cream-200 text-taupe-800 dark:bg-neutral-800 dark:text-taupe-300 border-cream-300 dark:border-neutral-700",
    primary: "bg-taupe-100 text-taupe-900 dark:bg-taupe-900 dark:text-taupe-100 border-taupe-200 dark:border-taupe-800",
    success: "bg-cream-200 text-taupe-800 dark:bg-neutral-800 dark:text-taupe-300 border-cream-300 dark:border-neutral-700",
    warning: "bg-cream-300 text-taupe-900 dark:bg-neutral-800 dark:text-cream-300 border-cream-400 dark:border-neutral-700",
    info: "bg-cream-200 text-taupe-800 dark:bg-neutral-800 dark:text-taupe-300 border-cream-300 dark:border-neutral-700",
    purple: "bg-cream-200 text-taupe-800 dark:bg-neutral-800 dark:text-taupe-300 border-cream-300 dark:border-neutral-700",
    pink: "bg-cream-200 text-taupe-800 dark:bg-neutral-800 dark:text-taupe-300 border-cream-300 dark:border-neutral-700",
    orange: "bg-cream-300 text-taupe-900 dark:bg-neutral-800 dark:text-cream-300 border-cream-400 dark:border-neutral-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium border ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;

