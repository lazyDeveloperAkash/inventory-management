import { useState, useEffect } from "react";
import { ProductTableSkeleton } from "../components/LoadingSkeleton";
import apiClient from "../utils/api";

export default function Reports() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockCount: 0,
    inStockCount: 0,
  });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchData = async (page = currentPage) => {
      try {
        setLoading(true);
        const [productsStats, lowStockRes] = await Promise.all([
          apiClient.get(`/products/stats`),
          apiClient.get(`/products/report/low-stock`, {
            params: {
              page,
              limit: ITEMS_PER_PAGE,
            },
          }),
        ]);
        setStats(productsStats.data);
        setLowStockProducts(lowStockRes.data.data);
        setTotalPages(lowStockRes.data.pagination.totalPages);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  const handleExportCsv = async () => {
    try {
      setExporting(true);
      const response = await apiClient.get(`/products/export/csv`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `inventory-report-${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      setError(err.message);
    } finally {
      setExporting(false);
    }
  };

  const getPaginationRange = (current, total, delta = 1) => {
    const range = [];
    const rangeWithDots = [];
    let last;

    for (let i = 1; i <= total; i++) {
      if (
        i === 1 ||
        i === total ||
        (i >= current - delta && i <= current + delta)
      ) {
        range.push(i);
      }
    }

    for (const num of range) {
      if (last) {
        if (num - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (num - last > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(num);
      last = num;
    }

    return rangeWithDots;
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        <p className="font-medium">Error loading reports</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (loading) {
    return <ProductTableSkeleton />;
  }

  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">
            View inventory insights and export data
          </p>
        </div>
        <button
          onClick={handleExportCsv}
          disabled={exporting || stats.totalProducts === 0}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {exporting ? "Exporting..." : "Export CSV"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-sm font-medium">Total Products</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.totalProducts}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-sm font-medium">Low Stock Items</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {lowStockProducts.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <p className="text-gray-600 text-sm font-medium">
            Total Inventory Value
          </p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ${stats.totalValue.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hidden md:block ">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Low Stock Alert
        </h2>
        {lowStockProducts.length === 0 ? (
          <div className="text-center py-8">
            <svg
              className="w-12 h-12 text-green-300 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 font-medium">
              All items are adequately stocked
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    SKU
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                    Current
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                    Threshold
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                    Deficit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lowStockProducts.map((product) => {
                  const deficit =
                    product.stockAlertThreshold - product.quantity;
                  return (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                        {product.sku}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {product.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-900">
                        {product.stockAlertThreshold}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-red-600">
                        +{deficit}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="md:hidden space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Low Stock Alert
        </h2>
        {lowStockProducts.map((p) => (
          <div
            key={p._id}
            className="border border-gray-200 bg-white rounded-lg p-4 shadow-md"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs font-mono text-gray-500">{p.sku}</p>
              </div>
              <span className="text-red-600 font-bold">
                +{p.stockAlertThreshold - p.quantity}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
              <div>
                <p className="text-gray-500">Current</p>
                <p>{p.quantity}</p>
              </div>
              <div>
                <p className="text-gray-500">Threshold</p>
                <p>{p.stockAlertThreshold}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lowStockProducts?.length > 0 && (
        <div className="flex justify-end mt-6 items-center space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md text-sm border ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 border-gray-300 cursor-pointer"
            }`}
          >
            Prev
          </button>

          {getPaginationRange(currentPage, totalPages).map((item, idx) =>
            item === "..." ? (
              <span
                key={`dots-${idx}`}
                className="px-3 py-1 text-gray-400 text-sm"
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`px-3 py-1 rounded-md text-sm border ${
                  currentPage === item
                    ? "bg-blue-600 text-white border-blue-600 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100 border-gray-300 cursor-pointer"
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md text-sm border ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100 border-gray-300 cursor-pointer"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
