require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const path = require("path");

// Plugins
const fastifySwagger = require("@fastify/swagger");
const fastifySwaggerUi = require("@fastify/swagger-ui");
const fastifyCors = require("@fastify/cors");

// Swagger setup
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: "Bruno Paulon Portfolio API",
      description: "Documentação da API do portfólio pessoal",
      version: "1.0.0"
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"]
  }
});

fastify.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false
  }
});

// Middleware
fastify.register(fastifyCors, {
  origin: "*"
});

// Routes
fastify.register(require("./routes/profileRoutes"), { prefix: "/api/profile" });
fastify.register(require("./routes/projectRoutes"), { prefix: "/api/projects" });
fastify.register(require("./routes/serviceRoutes"), { prefix: "/api/services" });
fastify.register(require("./routes/technologyRoutes"), { prefix: "/api/technologies" });
fastify.register(require("./routes/contactRoutes"), { prefix: "/api/contact" });

// Connect to MongoDB and start server
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
