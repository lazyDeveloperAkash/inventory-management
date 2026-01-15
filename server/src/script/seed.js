import dotenv from "dotenv";
import Product from "../models/Product.js";
import { connectDB } from "../config/database.js";

dotenv.config();

const seedProducts = [
  {
    name: "Wireless Mouse",
    sku: "WM-001",
    quantity: 120,
    price: 15.99,
    stockAlertThreshold: 20,
  },
  {
    name: "Mechanical Keyboard",
    sku: "MK-002",
    quantity: 45,
    price: 79.99,
    stockAlertThreshold: 10,
  },
  {
    name: "USB-C Cable",
    sku: "UC-003",
    quantity: 300,
    price: 9.49,
    stockAlertThreshold: 50,
  },
  {
    name: "Laptop Stand",
    sku: "LS-004",
    quantity: 60,
    price: 29.99,
    stockAlertThreshold: 15,
  },
  {
    name: "Webcam HD",
    sku: "WC-005",
    quantity: 25,
    price: 49.99,
    stockAlertThreshold: 10,
  },
  {
    name: "Bluetooth Speaker",
    sku: "BS-006",
    quantity: 80,
    price: 59.99,
    stockAlertThreshold: 20,
  },
  {
    name: "External SSD 1TB",
    sku: "ES-007",
    quantity: 18,
    price: 129.99,
    stockAlertThreshold: 5,
  },
  {
    name: "Gaming Headset",
    sku: "GH-008",
    quantity: 55,
    price: 69.99,
    stockAlertThreshold: 15,
  },
  {
    name: "Monitor 27 Inch",
    sku: "MN-009",
    quantity: 7,
    price: 249.99,
    stockAlertThreshold: 8,
  },
  {
    name: "USB Hub",
    sku: "UH-010",
    quantity: 150,
    price: 19.99,
    stockAlertThreshold: 30,
  },
];

const runSeed = async () => {
  try {
    console.log("🌱 Connecting to database...");
    await connectDB();

    console.log("🧹 Clearing existing products...");
    await Product.deleteMany();

    console.log("📦 Inserting seed products...");
    await Product.insertMany(seedProducts);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

runSeed();
