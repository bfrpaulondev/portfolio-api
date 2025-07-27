const {
  getTechnologies,
  createTechnology
} = require("../controllers/technologyController");

async function technologyRoutes(fastify, opts) {
  const techSchema = {
    type: "object",
    properties: {
      _id: { type: "string" },
      name: { type: "string" },
      category: { type: "string" },
      logo: { type: "string" },
      proficiencyLevel: { type: "string" },
      isActive: { type: "boolean" }
    }
  };

  const techInput = {
    type: "object",
    required: ["name", "category"],
    properties: {
      name: { type: "string" },
      category: { type: "string" },
      logo: { type: "string" },
      proficiencyLevel: { type: "string" },
      isActive: { type: "boolean" }
    }
  };

  fastify.get("/", {
    schema: {
      tags: ["Technologies"],
      summary: "Listar tecnologias",
      response: {
        200: { type: "array", items: techSchema }
      }
    }
  }, getTechnologies);

  fastify.post("/", {
    schema: {
      tags: ["Technologies"],
      summary: "Criar tecnologia",
      body: techInput,
      response: {
        201: techSchema
      }
    }
  }, createTechnology);
}

module.exports = technologyRoutes;
