import { useState, useEffect } from "react"
import { validateProduct } from "../utils/validation"

export default function ProductForm({ product, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    quantity: "",
    price: "",
    stockAlertThreshold: "10",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name ?? "",
        sku: product.sku ?? "",
        quantity: product.quantity ?? "",
        price: product.price ?? "",
        stockAlertThreshold: product.stockAlertThreshold ?? "10",
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { isValid, errors: validationErrors } = validateProduct(formData)

    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    onSubmit({
      ...formData,
      quantity: Number(formData.quantity),
      price: Number(formData.price),
      stockAlertThreshold: Number(formData.stockAlertThreshold),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          disabled={isLoading}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SKU
        </label>
        <input
          type="text"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          disabled={!!product || isLoading}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            errors.sku ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            disabled={isLoading}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.quantity ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            name="price"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            disabled={isLoading}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stock Alert Threshold
        </label>
        <input
          type="number"
          name="stockAlertThreshold"
          value={formData.stockAlertThreshold}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            errors.stockAlertThreshold ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.stockAlertThreshold && (
          <p className="text-red-500 text-xs mt-1">
            {errors.stockAlertThreshold}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
