export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-12 text-center">
          <div className="h-12 w-64 bg-slate-800 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-slate-800 rounded-lg mx-auto animate-pulse"></div>
        </div>

        {/* Featured Article Skeleton */}
        <div className="mb-12 bg-slate-800 rounded-2xl overflow-hidden animate-pulse">
          <div className="h-96 bg-slate-700"></div>
          <div className="p-8">
            <div className="h-8 bg-slate-700 rounded mb-4"></div>
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          </div>
        </div>

        {/* News Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-slate-800 rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-slate-700"></div>
              <div className="p-6">
                <div className="h-6 bg-slate-700 rounded mb-3"></div>
                <div className="h-4 bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
