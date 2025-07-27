/**
 * @file server.js
 * @description Main server file for the Portfolio API.
 * This file sets up the Fastify application, connects to the database, and defines API routes.
 * @author Bruno Paulon
 * @version 1.0.0
 */

require("dotenv").config(); // Load environment variables from .env file
const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");

// Import configuration
const dbConfig = require("./config/db.config");

// Register CORS plugin
fastify.register(require("@fastify/cors"), {
  origin: true, // Allow all origins
});

// Register Swagger plugins
fastify.register(require("@fastify/swagger"), {
  openapi: {
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
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
});

fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/api-docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next(); },
    preHandler: function (request, reply, next) { next(); },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject; },
  transformSpecificationClone: true,
});

// Register routes
fastify.register(require("./routes/profileRoutes"), { prefix: "/api/profile" });
fastify.register(require("./routes/serviceRoutes"), { prefix: "/api/services" });
fastify.register(require("./routes/projectRoutes"), { prefix: "/api/projects" });
fastify.register(require("./routes/technologyRoutes"), { prefix: "/api/technologies" });
fastify.register(require("./routes/contactRoutes"), { prefix: "/api/contact" });

// Database Connection
mongoose.connect(dbConfig.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully."))
.catch((err) => console.error("MongoDB connection error:", err));

// Basic route for API root
fastify.get("/", async (request, reply) => {
  return {
    message: "Welcome to Bruno Paulon's Portfolio API!",
    version: "1.0.0",
    documentation: "http://localhost:5000/api-docs",
  };
});

// Error handler
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({ error: "Something went wrong!" });
});

// Start the server
const start = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

