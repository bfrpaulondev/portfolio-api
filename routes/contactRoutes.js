const { createContact } = require("../controllers/contactController");

async function contactRoutes(fastify, opts) {
  const contactInput = {
    type: "object",
    required: ["name", "email", "message"],
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      message: { type: "string" }
    }
  };

  fastify.post("/", {
    schema: {
      tags: ["Contact"],
      summary: "Enviar mensagem de contato",
      body: contactInput,
      response: {
        201: { type: "object", properties: { message: { type: "string" } } }
      }
    }
  }, createContact);
}

module.exports = contactRoutes;
