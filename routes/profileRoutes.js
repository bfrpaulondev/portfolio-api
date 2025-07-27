const { getProfile, createOrUpdateProfile } = require("../controllers/profileController");

async function profileRoutes(fastify, opts) {
  const profileSchema = {
    type: "object",
    properties: {
      _id: { type: "string" },
      name: { type: "string" },
      title: { type: "string" },
      bio: { type: "string" },
      contactEmail: { type: "string" },
      linkedin: { type: "string" },
      github: { type: "string" }
    }
  };

  const profileInput = {
    type: "object",
    required: ["name", "title"],
    properties: {
      name: { type: "string" },
      title: { type: "string" },
      bio: { type: "string" },
      contactEmail: { type: "string" },
      linkedin: { type: "string" },
      github: { type: "string" }
    }
  };

  fastify.get("/", {
    schema: {
      tags: ["Profile"],
      summary: "Obter perfil do portfólio",
      response: {
        200: profileSchema,
        404: { type: "object", properties: { error: { type: "string" } } }
      }
    }
  }, getProfile);

  fastify.post("/", {
    schema: {
      tags: ["Profile"],
      summary: "Criar ou atualizar perfil",
      body: profileInput,
      response: {
        200: profileSchema,
        201: profileSchema
      }
    }
  }, createOrUpdateProfile);
}

module.exports = profileRoutes;
