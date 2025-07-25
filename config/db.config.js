/**
 * @file config/db.config.js
 * @description Database connection configuration.
 * This file centralizes MongoDB connection settings.
 * @author Bruno Paulon
 * @version 1.0.0
 */

module.exports = {
  mongoURI: process.env.MONGODB_URI || "mongodb+srv://paulonbruno9:b6dzdF7VguSs2PyW@cluster0.zz2wbag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
};

