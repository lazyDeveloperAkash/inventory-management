import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import dotenv from "dotenv"
import { connectDB } from "./config/database.js"
import { errorHandler } from "./middleware/errorHandler.js"
import productRoutes from "./routes/productRoutes.js"

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5173", process.env.FRONTEND_URL || "http://localhost:3000"],
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
connectDB();

// API Routes
app.use("/api/products", productRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
})

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
})

export default app;
