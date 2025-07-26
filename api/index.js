/**
 * @file api/index.js
 * @description Vercel serverless function entry point for the Portfolio API.
 * @author Bruno Paulon
 * @version 1.0.0
 */

require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Swagger Documentation Setup
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Import configuration
const dbConfig = require("../config/db.config");

const app = express();

// Import Routes
const profileRoutes = require("../routes/profileRoutes");
const serviceRoutes = require("../routes/serviceRoutes");
const projectRoutes = require("../routes/projectRoutes");
const technologyRoutes = require("../routes/technologyRoutes");
const contactRoutes = require("../routes/contactRoutes");

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

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio API Documentation",
      version: "1.0.0",
      description: "API documentation for Bruno Paulon's Portfolio project.",
      contact: {
        name: "Bruno Paulon",
        email: "bfrpaulondev@gmail.com",
      },
    },
    servers: [
      {
        url: "https://portfolio-api-nine-tau.vercel.app",
        description: "Production server",
      },
    ],
  },
  apis: ["../routes/*.js", "../controllers/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Swagger UI configuration for Vercel
const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    url: null,
    spec: swaggerDocs,
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));

// Basic route for API root
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Bruno Paulon's Portfolio API!",
    version: "1.0.0",
    documentation: "https://portfolio-api-nine-tau.vercel.app/api-docs",
  });
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;

