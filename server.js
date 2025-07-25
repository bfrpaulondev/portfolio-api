/**
 * @file server.js
 * @description Main server file for the Portfolio API.
 * This file sets up the Express application, connects to the database, and defines API routes.
 * @author Bruno Paulon
 * @version 1.0.0
 */

require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import configuration
const dbConfig = require("./config/db.config");

const app = express();

// Import Routes
const profileRoutes = require("./routes/profileRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const technologyRoutes = require("./routes/technologyRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Use Routes
app.use("/api/profile", profileRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/contact", contactRoutes);

// Database Connection
mongoose.connect(dbConfig.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully."))
.catch((err) => console.error("MongoDB connection error:", err));

// Basic route for API root
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Bruno Paulon's Portfolio API!",
    version: "1.0.0",
    documentation: "[Link to API Docs]", // Placeholder for future documentation
  });
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


