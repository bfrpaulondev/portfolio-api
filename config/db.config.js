/**
 * @file config/db.config.js
 * @description Database connection configuration.
 * This file centralizes MongoDB connection settings.
 * @author Bruno Paulon
 * @version 1.0.0
 */

module.exports = {
  mongoURI: process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio_db",
};

