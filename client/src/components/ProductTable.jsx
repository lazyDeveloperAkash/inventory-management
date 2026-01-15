import { FileText, Edit2, Trash2 } from "lucide-react";
import { ProductTableSkeleton } from "./LoadingSkeleton";

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  isLoading,
}) {
  if (isLoading) {
    return <ProductTableSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText size={64} className="text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No products found</p>
        <p className="text-gray-400 text-sm">
          Create your first product to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                SKU
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                Quantity
              </th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((product) => {
              const isLowStock = product.quantity < product.stockAlertThreshold;

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
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    {isLowStock ? (
                      <StatusBadge color="red" text="Low Stock" />
                    ) : (
                      <StatusBadge color="green" text="In Stock" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <ActionButtons
                      onEdit={() => onEdit(product)}
                      onDelete={() => onDelete(product._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {products.map((product) => {
          const isLowStock = product.quantity < product.stockAlertThreshold;

          return (
            <div
              key={product._id}
              className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    {product.sku}
                  </p>
                </div>
                {isLowStock ? (
                  <StatusBadge color="red" text="Low Stock" />
                ) : (
                  <StatusBadge color="green" text="In Stock" />
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Quantity</p>
                  <p className="font-medium text-gray-900">
                    {product.quantity}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <ActionButtons
                  onEdit={() => onEdit(product)}
                  onDelete={() => onDelete(product._id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

const StatusBadge = ({ color, text }) => {
  const styles = {
    red: "bg-red-50 text-red-700",
    green: "bg-green-50 text-green-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${styles[color]}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          color === "red" ? "bg-red-500" : "bg-green-500"
        }`}
      />
      {text}
    </span>
  );
};

const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="flex items-center gap-2">
    <button
      onClick={onEdit}
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
      title="Edit"
    >
      <Edit2 size={16} />
    </button>
    <button
      onClick={onDelete}
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  </div>
);
