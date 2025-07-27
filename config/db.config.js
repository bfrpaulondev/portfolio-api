require("dotenv").config();
const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const { mongoURI: cfgMongoURI } = require("../config/db.config.js");

// Usa MONGO_URI, ou MONGODB_URI (legado), ou o valor do config como fallback
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || cfgMongoURI;

if (!MONGO_URI) {
  throw new Error("MongoDB URI is missing. Set MONGO_URI (or MONGODB_URI) in .env or config/db.config.js.");
}

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    fastify.log.info("MongoDB connected");
    await fastify.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
