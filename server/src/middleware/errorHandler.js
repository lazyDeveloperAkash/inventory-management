export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      details: Object.values(err.errors).map((e) => e.message),
    })
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res.status(400).json({
      error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
    })
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({ error: "Invalid ID format" })
  }

  // Default error
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal server error",
  })
}
