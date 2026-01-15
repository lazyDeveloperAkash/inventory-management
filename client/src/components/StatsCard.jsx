import { StatsSkeleton } from "./LoadingSkeleton"

export default function StatsCard({ title, value, icon, color = "blue", isLoading = false }) {
  if (isLoading) {
    return <StatsSkeleton />
  }

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
