import { useState, useEffect } from "react";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import Modal from "../components/Modal";
import apiClient from "../utils/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const ITEMS_PER_PAGE = 10;

  const fetchProducts = async (
    page = currentPage,
    search = debouncedSearch
  ) => {
    try {
      setLoading(true);

      const response = await apiClient.get(`/products`, {
        params: {
          page,
          limit: ITEMS_PER_PAGE,
          search,
        },
      });

      setProducts(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (formData) => {
    try {
      setFormLoading(true);
      if (editingProduct) {
        await apiClient.put(
          `/products/${editingProduct._id}`,
          formData
        );
      } else {
        await apiClient.post(`/products`, formData);
      }
      await fetchProducts();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await apiClient.delete(`/products/${id}`);
      await fetchProducts();
    } catch (err) {
      setError(err.message);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchProducts(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your inventory items</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center gap-2"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Product
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          <p className="font-medium">Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="md:bg-white rounded-xl md:border md:border-gray-200 md:shadow-sm overflow-hidden">
        <ProductTable
          products={products}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          isLoading={loading}
        />
      </div>

      {products?.length > 0 && (
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

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingProduct ? "Edit Product" : "New Product"}
      >
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={formLoading}
        />
      </Modal>
    </div>
  );
}
