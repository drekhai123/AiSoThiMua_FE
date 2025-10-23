export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="mb-12 text-center">
          <div className="h-12 w-64 bg-slate-800 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 w-96 bg-slate-800 rounded-lg mx-auto animate-pulse"></div>
        </div>

        {/* Filters Skeleton */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 w-32 bg-slate-800 rounded-lg flex-shrink-0 animate-pulse"></div>
          ))}
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-slate-800 rounded-xl p-6 animate-pulse">
              <div className="aspect-square bg-slate-700 rounded-lg mb-4"></div>
              <div className="h-6 bg-slate-700 rounded mb-3"></div>
              <div className="h-4 bg-slate-700 rounded mb-4 w-3/4"></div>
              <div className="h-8 bg-slate-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
