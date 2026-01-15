import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      default: 0,
      min: [0, "Quantity cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    stockAlertThreshold: {
      type: Number,
      default: 10,
      min: [0, "Threshold cannot be negative"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.index(
  { name: "text", sku: "text" },
  { weights: { name: 5, sku: 10 } }
);

export default mongoose.model("Product", productSchema);
