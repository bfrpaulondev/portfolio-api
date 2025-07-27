
/**
 * @file config/db.config.js
 * @description Centraliza as configurações da conexão MongoDB para a Portfolio API com Fastify.
 * @author Bruno Paulon
 * @version 2.0.0
 */

module.exports = {
  mongoURI: process.env.MONGO_URI || "mongodb+srv://paulonbruno9:b6dzdF7VguSs2PyW@cluster0.zz2wbag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", // fallback local
};
