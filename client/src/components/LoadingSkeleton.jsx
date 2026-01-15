export function ProductTableSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-lg p-4 border border-gray-200 animate-pulse"
        >
          <div className="flex gap-4">
            <div className="flex-1 h-6 bg-gray-200 rounded w-1/4" />
            <div className="flex-1 h-6 bg-gray-200 rounded w-1/4" />
            <div className="flex-1 h-6 bg-gray-200 rounded w-1/4" />
            <div className="w-16 h-6 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/2"></div>
      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i}>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      ))}
      <div className="h-10 bg-gray-200 rounded" />
    </div>
  );
}
