const mongoose = require("mongoose");
require("dotenv").config(); // Load env variables

const connect = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("❌ MongoDB URI is missing. Please set MONGO_URI in your .env file.");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri)

    const connection = mongoose.connection;
    console.log("✅ MongoDB connected successfully");

    connection.on("connected", () => {
      console.log("✅ MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
      process.exit(1);
    });

  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connect;