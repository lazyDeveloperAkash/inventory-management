import Product from "../models/Product.js";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createProduct = async (req, res) => {
  const { name, sku, quantity, price, stockAlertThreshold } = req.body;

  const product = new Product({
    name,
    sku: sku.toUpperCase(),
    quantity,
    price,
    stockAlertThreshold: stockAlertThreshold ?? 10,
  });

  await product.save();
  res.status(201).json(product);
};

export const getAllProducts = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const search = req.query.search?.trim();

  const skip = (page - 1) * limit;

  const query = search ? { $text: { $search: search } } : {};

  const sort = search ? { score: { $meta: "textScore" } } : { createdAt: -1 };

  const projection = search ? { score: { $meta: "textScore" } } : {};

  const [products, total] = await Promise.all([
    Product.find(query, projection).sort(sort).skip(skip).limit(limit),
    Product.countDocuments(query),
  ]);

  res.json({
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw Object.assign(new Error("Product not found"), { statusCode: 404 });
  }

  res.json(product);
};

export const updateProduct = async (req, res) => {
  const updateData = { ...req.body };

  if (updateData.sku) {
    updateData.sku = updateData.sku.toUpperCase();
  }

  const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw Object.assign(new Error("Product not found"), { statusCode: 404 });
  }

  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw Object.assign(new Error("Product not found"), { statusCode: 404 });
  }

  res.json({ message: "Product deleted successfully" });
};

export const getLowStockProducts = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Number(req.query.limit) || 10, 50);
  const search = req.query.search?.trim();

  const skip = (page - 1) * limit;

  const matchStage = {
    $expr: { $lt: ["$quantity", "$stockAlertThreshold"] },
  };

  // Optional search (uses text index if present)
  if (search) {
    matchStage.$text = { $search: search };
  }

  const pipeline = [
    { $match: matchStage },

    ...(search ? [{ $addFields: { score: { $meta: "textScore" } } }] : []),

    {
      $sort: search ? { score: -1 } : { quantity: 1 },
    },

    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
        total: [{ $count: "count" }],
      },
    },
  ];

  const result = await Product.aggregate(pipeline);

  const products = result[0]?.data || [];
  const total = result[0]?.total[0]?.count || 0;

  res.json({
    data: products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};

export const exportCsv = async (req, res) => {
  const products = await Product.find();

  if (!products.length) {
    return res.status(400).json({ error: "No products to export" });
  }

  const csvData = products.map((p) => ({
    Name: p.name,
    SKU: p.sku,
    Quantity: p.quantity,
    Price: `$${p.price.toFixed(2)}`,
    AlertThreshold: p.stockAlertThreshold,
    IsLowStock: p.quantity < p.stockAlertThreshold ? "Yes" : "No",
  }));

  const filename = `inventory-${Date.now()}.csv`;
  const exportsDir =
    process.env.TEMP_DIR || path.join(__dirname, "../../exports");

  if (!fs.existsSync(exportsDir)) fs.mkdirSync(exportsDir, { recursive: true });

  const filepath = path.join(exportsDir, filename);

  const csvWriter = createObjectCsvWriter({
    path: filepath,
    header: [
      { id: "Name", title: "Product Name" },
      { id: "SKU", title: "SKU" },
      { id: "Quantity", title: "Current Quantity" },
      { id: "Price", title: "Unit Price" },
      { id: "AlertThreshold", title: "Alert Threshold" },
      { id: "IsLowStock", title: "Low Stock Alert" },
    ],
  });

  await csvWriter.writeRecords(csvData);

  res.download(filepath, filename, () => {
    fs.unlink(filepath, () => {});
  });
};

export const getProductStats = async (req, res) => {
  const result = await Product.aggregate([
    {
      // Ensure missing fields don’t break calculations
      $project: {
        quantity: { $ifNull: ["$quantity", 0] },
        price: { $ifNull: ["$price", 0] },
        stockAlertThreshold: { $ifNull: ["$stockAlertThreshold", 0] },
      },
    },
    {
      $group: {
        _id: null,

        totalProducts: { $sum: 1 },

        totalValue: {
          $sum: { $multiply: ["$quantity", "$price"] },
        },

        lowStockCount: {
          $sum: {
            $cond: [{ $lt: ["$quantity", "$stockAlertThreshold"] }, 1, 0],
          },
        },

        inStockCount: {
          $sum: {
            $cond: [{ $gte: ["$quantity", "$stockAlertThreshold"] }, 1, 0],
          },
        },
      },
    },
  ]);

  res.json(
    result[0] || {
      totalProducts: 0,
      totalValue: 0,
      lowStockCount: 0,
      inStockCount: 0,
    }
  );
};
