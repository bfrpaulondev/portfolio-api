/**
 * @file api/index.js
 * @description Vercel serverless function entry point using Fastify for Bruno Paulon's Portfolio API.
 * @author Bruno Paulon
 * @version 2.0.0
 */

const fastify = require("fastify")({ logger: false });
const mongoose = require("mongoose");
const cors = require("@fastify/cors");
const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Register middleware
fastify.register(cors, { origin: "*" });

// Register Swagger
fastify.register(swagger, {
  swagger: {
    info: {
      title: "Portfolio API Documentation",
      version: "2.0.0",
      description: "API para o portfólio de Bruno Paulon",
      contact: {
        name: "Bruno Paulon",
        email: "bfrpaulondev@gmail.com"
      }
    },
    host: "localhost",
    schemes: ["https"],
    consumes: ["application/json"],
    produces: ["application/json"]
  }
});

fastify.register(swaggerUI, {
  routePrefix: "/api-docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false
  }
});

// Register routes
fastify.register(require("../routes/profileRoutes"), { prefix: "/api/profile" });
fastify.register(require("../routes/serviceRoutes"), { prefix: "/api/services" });
fastify.register(require("../routes/projectRoutes"), { prefix: "/api/projects" });
fastify.register(require("../routes/technologyRoutes"), { prefix: "/api/technologies" });
fastify.register(require("../routes/contactRoutes"), { prefix: "/api/contact" });

// Root Route
fastify.get("/", async (request, reply) => {
  return {
    message: "Welcome to Bruno Paulon's Portfolio API (Fastify Version)!",
    version: "2.0.0",
    documentation: "/api-docs"
  };
});

// Export handler for Vercel
module.exports = async (req, res) => {
  await fastify.ready();
  fastify.server.emit("request", req, res);
};
