const {
  getServices,
  createService
} = require("../controllers/serviceController");

async function serviceRoutes(fastify, opts) {
  const serviceSchema = {
    type: "object",
    properties: {
      _id: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
      icon: { type: "string" },
      link: { type: "string" },
      isActive: { type: "boolean" }
    }
  };

  const serviceInput = {
    type: "object",
    required: ["title", "description", "price"],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
      icon: { type: "string" },
      link: { type: "string" },
      isActive: { type: "boolean" }
    }
  };

  fastify.get("/", {
    schema: {
      tags: ["Services"],
      summary: "Listar serviços",
      response: { 200: { type: "array", items: serviceSchema } }
    }
  }, getServices);

  fastify.post("/", {
    schema: {
      tags: ["Services"],
      summary: "Criar serviço",
      body: serviceInput,
      response: { 201: serviceSchema }
    }
  }, createService);
}

module.exports = serviceRoutes;
