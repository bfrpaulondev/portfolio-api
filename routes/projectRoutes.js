const {
  getProjects,
  getProjectById,
  getProjectsByCategory,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

async function projectRoutes(fastify, opts) {
  const projectSchema = {
    type: "object",
    properties: {
      _id: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      category: { type: "string" },
      imageUrl: { type: "string" },
      projectUrl: { type: "string" },
      isActive: { type: "boolean" }
    }
  };

  const projectInput = {
    type: "object",
    required: ["title", "description", "category", "imageUrl", "projectUrl"],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      category: { type: "string" },
      imageUrl: { type: "string" },
      projectUrl: { type: "string" },
      isActive: { type: "boolean" }
    }
  };

  fastify.get("/", { schema: { tags: ["Projects"], summary: "Listar projetos", response: { 200: { type: "array", items: projectSchema } } } }, getProjects);
  fastify.get("/:id", { schema: { tags: ["Projects"], summary: "Obter por ID", params: { type: "object", properties: { id: { type: "string" } } }, response: { 200: projectSchema, 404: { type: "object", properties: { error: { type: "string" } } } } } }, getProjectById);
  fastify.get("/category/:category", { schema: { tags: ["Projects"], summary: "Filtrar por categoria", params: { type: "object", properties: { category: { type: "string" } } }, response: { 200: { type: "array", items: projectSchema } } } }, getProjectsByCategory);
  fastify.post("/", { schema: { tags: ["Projects"], summary: "Criar projeto", body: projectInput, response: { 201: projectSchema } } }, createProject);
  fastify.put("/:id", { schema: { tags: ["Projects"], summary: "Atualizar projeto", params: { type: "object", properties: { id: { type: "string" } } }, body: projectInput, response: { 200: projectSchema, 404: { type: "object", properties: { error: { type: "string" } } } } } }, updateProject);
  fastify.delete("/:id", { schema: { tags: ["Projects"], summary: "Excluir projeto", params: { type: "object", properties: { id: { type: "string" } } }, response: { 200: { type: "object", properties: { message: { type: "string" } } } } } }, deleteProject);
}

module.exports = projectRoutes;
