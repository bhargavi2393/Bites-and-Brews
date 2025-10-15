require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewroute");
const connectDB = require("./config/db");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

const startServer = async () => {
  await connectDB(); // Ensure DB is connected before starting the server

  app.use("/api/v1", authRoutes);
  app.use("/api/v1/r", reviewRoutes);

  app.listen(3000, () => {
    console.log("✅ Server is running on port 3000");
  });
};

startServer();
