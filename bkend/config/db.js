require("dotenv").config();
const mongoose = require("mongoose");

const DB_URI = process.env.MONGO_URI;
const NODE_ENV = process.env.NODE_ENV || "development";

if (!DB_URI) {
  throw new Error(`❌ Please define MONGO_URI in your .env.${NODE_ENV}.local`);
}

let conn = null;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    conn = mongoose.connection; // Now set the connection here
    console.log(`✅ Connected to MongoDB in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
module.exports.conn = () => conn; 
