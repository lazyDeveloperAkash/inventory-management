import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  try {
    if (isConnected) return;
    const MONGODB_URI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/inventory";

    await mongoose.connect(MONGODB_URI);

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("MongoDB disconnection error:", error.message);
  }
};
