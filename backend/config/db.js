import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const databaseUrl = process.env.MONGODB_URL;

    if (!databaseUrl) {
      throw new Error("MONGODB_URL is not defined");
    }

    await mongoose.connect(databaseUrl);

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;