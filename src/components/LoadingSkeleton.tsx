const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-cream-100 dark:bg-neutral-950">
      {/* Header skeleton */}
      <div className="border-b border-cream-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-cream-200 dark:bg-neutral-800 animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-6 w-64 bg-cream-200 dark:bg-neutral-800 animate-pulse" />
              <div className="h-4 w-48 bg-cream-200 dark:bg-neutral-800 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cream-200 dark:bg-neutral-800 border border-cream-200 dark:border-neutral-800">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-neutral-100 dark:bg-neutral-900 p-6 h-24"
            >
              <div className="space-y-3">
                <div className="h-3 w-20 bg-cream-200 dark:bg-neutral-800 animate-pulse" />
                <div className="h-8 w-16 bg-cream-200 dark:bg-neutral-800 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Chart skeleton */}
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-cream-200 dark:border-neutral-800 p-6 h-96">
          <div className="h-full bg-cream-50 dark:bg-neutral-950 animate-pulse" />
        </div>
        
        {/* Table skeleton */}
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-cream-200 dark:border-neutral-800">
          <div className="border-b border-cream-200 dark:border-neutral-800 px-6 py-4">
            <div className="h-4 w-32 bg-cream-200 dark:bg-neutral-800 animate-pulse mb-4" />
            <div className="h-10 bg-cream-50 dark:bg-neutral-950 animate-pulse" />
          </div>
          <div className="divide-y divide-cream-200 dark:divide-neutral-800">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="px-6 py-4">
                <div className="h-4 bg-cream-200 dark:bg-neutral-800 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadingSkeleton;

