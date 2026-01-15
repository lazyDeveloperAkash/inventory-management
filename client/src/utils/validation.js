// Validate product form
export const validateProduct = (data) => {
  const errors = {}

  if (!data.name?.trim()) {
    errors.name = "Product name is required"
  } else if (data.name.length < 2) {
    errors.name = "Name must be at least 2 characters"
  } else if (data.name.length > 100) {
    errors.name = "Name must not exceed 100 characters"
  }

  if (!data.sku?.trim()) {
    errors.sku = "SKU is required"
  } else if (data.sku.length < 2) {
    errors.sku = "SKU must be at least 2 characters"
  } else if (!/^[A-Z0-9\-_]+$/i.test(data.sku)) {
    errors.sku = "SKU can only contain letters, numbers, hyphens, and underscores"
  }

  const quantity = Number(data.quantity)
  if (data.quantity === "" || isNaN(quantity)) {
    errors.quantity = "Valid quantity is required"
  } else if (quantity < 0) {
    errors.quantity = "Quantity cannot be negative"
  } else if (!Number.isInteger(quantity)) {
    errors.quantity = "Quantity must be a whole number"
  }

  const price = Number(data.price)
  if (data.price === "" || isNaN(price)) {
    errors.price = "Valid price is required"
  } else if (price < 0) {
    errors.price = "Price cannot be negative"
  }

  const threshold = Number(data.stockAlertThreshold)
  if (threshold < 0) {
    errors.stockAlertThreshold = "Threshold cannot be negative"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// Validate search query
export const validateSearchQuery = (query) => {
  return query.length <= 100
}
