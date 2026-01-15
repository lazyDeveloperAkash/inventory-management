import { useState, useEffect } from "react";
import StatsCard from "../components/StatsCard";
import { Package, DollarSign, AlertCircle, CheckCircle } from "lucide-react";
import apiClient from "../utils/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockCount: 0,
    inStockCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const response = await apiClient.get(`/products/stats`);

        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p className="font-medium">Error loading dashboard</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your inventory</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package size={24} />}
          color="blue"
          isLoading={loading}
        />
        <StatsCard
          title="Inventory Value"
          value={`$${stats.totalValue.toFixed(2)}`}
          icon={<DollarSign size={24} />}
          color="green"
          isLoading={loading}
        />
        <StatsCard
          title="Low Stock Items"
          value={stats.lowStockCount}
          icon={<AlertCircle size={24} />}
          color="red"
          isLoading={loading}
        />
        <StatsCard
          title="In Stock"
          value={stats.inStockCount}
          icon={<CheckCircle size={24} />}
          color="green"
          isLoading={loading}
        />
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h2>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li className="flex items-start gap-3">
            <span className="text-blue-500 font-bold mt-1">•</span>
            <span>
              Monitor low-stock items regularly and set appropriate thresholds
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-500 font-bold mt-1">•</span>
            <span>Use the Reports section to export inventory data as CSV</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-500 font-bold mt-1">•</span>
            <span>Update product quantities when restocking</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
