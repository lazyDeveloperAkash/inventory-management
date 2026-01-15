// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

// Format number with commas
export const formatNumber = (num) => {
  return new Intl.NumberFormat("en-US").format(num)
}

// Get stock status
export const getStockStatus = (quantity, threshold) => {
  if (quantity < threshold) {
    return {
      status: "low",
      label: "Low Stock",
      color: "bg-red-50 text-red-700",
      dotColor: "bg-red-500",
    }
  }
  return {
    status: "ok",
    label: "In Stock",
    color: "bg-green-50 text-green-700",
    dotColor: "bg-green-500",
  }
}

// Calculate stock deficit
export const calculateDeficit = (quantity, threshold) => {
  return Math.max(0, threshold - quantity)
}
