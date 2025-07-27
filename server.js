/**
 * @file server.js
 * @description Local entrypoint for the Portfolio API (Fastify + MongoDB + Swagger).
 * Run: `npm run dev` or `node server.js`
 */

require("dotenv").config();

const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");

const cors = require("@fastify/cors");
const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");

const { mongoURI: cfgMongoURI } = require("./config/db.config");

// -------------------- Env & constants ---------------------------------------
const DEFAULT_PORT = Number(process.env.PORT || 3000);
const PUBLIC_BASE_URL = process.env.PUBLIC_BASE_URL || ""; // opcional (produção)
const HOST = "0.0.0.0";

// Aceita MONGO_URI novo, MONGODB_URI legado, ou fallback do config
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || cfgMongoURI;

// Log seguro (mascara password)
const maskedMongo = MONGO_URI
  ? MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@")
  : "MISSING";

fastify.log.info({ maskedMongo }, "MongoDB target");

// -------------------- Plugins globais (CORS antes) --------------------------
fastify.register(cors, {
  origin: true, // em produção, restringe ao teu frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
});

// Swagger (OpenAPI 3) — sem `servers` para não fixar host/porta
fastify.register(swagger, {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Portfolio API",
      version: "2.0.0",
      description: "Fastify API for personal portfolio (MongoDB + Swagger)"
    }
    // servers omitidos de propósito
  }
});

fastify.register(swaggerUI, {
  routePrefix: "/api-docs",
  uiConfig: { docExpansion: "list", deepLinking: true },
  staticCSP: true
});

// -------------------- Rotas (Fastify plugins) -------------------------------
fastify.register(require("./routes/profileRoutes"), { prefix: "/api/profile" });
fastify.register(require("./routes/projectRoutes"), { prefix: "/api/projects" });
fastify.register(require("./routes/serviceRoutes"), { prefix: "/api/services" });
fastify.register(require("./routes/technologyRoutes"), { prefix: "/api/technologies" });
fastify.register(require("./routes/contactRoutes"), { prefix: "/api/contact" });

// Healthcheck & root
fastify.get("/health", async () => ({
  status: "ok",
  time: new Date().toISOString()
}));

fastify.get("/", async () => ({
  message: "Portfolio API (Fastify) is running",
  docs: "/api-docs"
}));

// -------------------- Listen com retry e guarda de reentrada ----------------

// impede chamadas duplicadas ao start/listen no mesmo processo
let started = false;

/**
 * Tenta iniciar o servidor na porta desejada e, se estiver ocupada,
 * tenta as próximas portas até `attempts` vezes.
 */
async function listenWithRetry(app, startPort = DEFAULT_PORT, attempts = 8) {
  let port = startPort;
  for (let i = 0; i < attempts; i++) {
    try {
      await app.listen({ port, host: HOST });
      const addr = app.server.address();
      const finalPort = typeof addr === "object" && addr ? addr.port : port;

      const base = PUBLIC_BASE_URL || `http://localhost:${finalPort}`;
      app.log.info(`Server listening at ${base}`);
      app.log.info(`Docs available at ${base}/api-docs`);
      return;
    } catch (err) {
      if (err && err.code === "EADDRINUSE" && i < attempts - 1) {
        app.log.warn(`Port ${port} in use, trying ${port + 1}...`);
        port++;
      } else {
        throw err;
      }
    }
  }
}

// -------------------- Bootstrap --------------------------------------------
const start = async () => {
  try {
    if (started) {
      fastify.log.warn("start() called more than once in the same process — ignoring.");
      return;
    }
    started = true;

    if (!MONGO_URI) {
      throw new Error("MongoDB URI missing. Set MONGO_URI (or MONGODB_URI) in .env.");
    }

    // Conecta ao Mongo apenas se necessário
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI);
      fastify.log.info("MongoDB connected");
    } else {
      fastify.log.info(`Mongo already connected (state=${mongoose.connection.readyState})`);
    }

    await listenWithRetry(fastify, DEFAULT_PORT, 8);
  } catch (err) {
    fastify.log.error(err, "Fatal error during startup");
    process.exit(1);
  }
};

// Tratamento opcional
process.on("unhandledRejection", (reason) => {
  fastify.log.error({ reason }, "unhandledRejection");
});
process.on("uncaughtException", (err) => {
  fastify.log.error({ err }, "uncaughtException");
});

start();
