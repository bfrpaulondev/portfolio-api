/**
 * @file api/index.js
 * @description Vercel serverless entry with Fastify + Mongo + Swagger + CORS.
 */
const fastify = require("fastify")({ logger: false });
const mongoose = require("mongoose");
const cors = require("@fastify/cors");
const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");

require("dotenv").config();
const { mongoURI } = require("../config/db.config");

// Em Vercel, defina PUBLIC_BASE_URL=https://<app>.vercel.app
const BASE_URL =
  process.env.PUBLIC_BASE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || mongoURI;
if (!MONGO_URI) throw new Error("MongoDB URI missing (set MONGO_URI in env).");

// CORS
fastify.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
});

// Swagger
fastify.register(swagger, {
  openapi: {
    openapi: "3.0.0",
    info: { title: "Portfolio API", version: "2.0.0", description: "Serverless Fastify on Vercel" },
    servers: [{ url: BASE_URL }]
  }
});

fastify.register(swaggerUI, {
  routePrefix: "/api-docs",
  uiConfig: { docExpansion: "list", deepLinking: true },
  staticCSP: true
});

// Rotas
fastify.register(require("../routes/profileRoutes"), { prefix: "/api/profile" });
fastify.register(require("../routes/projectRoutes"), { prefix: "/api/projects" });
fastify.register(require("../routes/serviceRoutes"), { prefix: "/api/services" });
fastify.register(require("../routes/technologyRoutes"), { prefix: "/api/technologies" });
fastify.register(require("../routes/contactRoutes"), { prefix: "/api/contact" });

// Root
fastify.get("/", async () => ({
  message: "Portfolio API (Fastify + Vercel)",
  docs: "/api-docs"
}));

// Serverless handler
module.exports = async (req, res) => {
  // Conecta apenas no cold start
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  }
  await fastify.ready();
  fastify.server.emit("request", req, res);
};
