/**
 * @file routes/projectRoutes.js
 * @description Fastify routes for project-related endpoints.
 * Defines API routes for project management.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const {
  getProjects,
  getProjectById,
  getProjectsByCategory,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

async function projectRoutes(fastify, options) {
  // Schema definitions for Swagger
  const projectSchema = {
    type: "object",
    properties: {
      _id: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      category: { type: "string" },
      imageUrl: { type: "string" },
      projectUrl: { type: "string" },
      active: { type: "boolean" }
    }
  };

  const projectInputSchema = {
    type: "object",
    required: ["title", "description", "category", "imageUrl", "projectUrl"],
    properties: {
      title: { type: "string", description: "Title of the project" },
      description: { type: "string", description: "Detailed description of the project" },
      category: { type: "string", description: "Category of the project (e.g., Web Development, Mobile App)" },
      imageUrl: { type: "string", description: "URL of the project image" },
      projectUrl: { type: "string", description: "URL to the live project or repository" },
      active: { type: "boolean", description: "Whether the project is active or not" }
    }
  };

  // GET /api/projects
  fastify.get("/", {
    schema: {
      tags: ["Projects"],
      summary: "Get all active projects",
      description: "Retrieve all active projects in the portfolio",
      response: {
        200: {
          description: "Successfully retrieved all projects",
          type: "array",
          items: projectSchema
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        }
      }
    }
  }, async (request, reply) => {
    return await getProjects(request, reply);
  });

  // GET /api/projects/category/:category
  fastify.get("/category/:category", {
    schema: {
      tags: ["Projects"],
      summary: "Get projects by category",
      description: "Retrieve projects filtered by category",
      params: {
        type: "object",
        properties: {
          category: { type: "string", description: "Category of projects to retrieve" }
        },
        required: ["category"]
      },
      response: {
        200: {
          description: "Successfully retrieved projects by category",
          type: "array",
          items: projectSchema
        },
        404: {
          description: "No projects found for the given category",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        }
      }
    }
  }, async (request, reply) => {
    return await getProjectsByCategory(request, reply);
  });

  // GET /api/projects/:id
  fastify.get("/:id", {
    schema: {
      tags: ["Projects"],
      summary: "Get a single project by ID",
      description: "Retrieve a specific project by its ID",
      params: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the project to retrieve" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Successfully retrieved project information",
          ...projectSchema
        },
        404: {
          description: "Project not found",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        }
      }
    }
  }, async (request, reply) => {
    return await getProjectById(request, reply);
  });

  // POST /api/projects
  fastify.post("/", {
    schema: {
      tags: ["Projects"],
      summary: "Create a new project",
      description: "Create a new project in the portfolio",
      body: projectInputSchema,
      response: {
        201: {
          description: "Project created successfully",
          ...projectSchema
        },
        400: {
          description: "Invalid input",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        }
      }
    }
  }, async (request, reply) => {
    return await createProject(request, reply);
  });

  // PUT /api/projects/:id
  fastify.put("/:id", {
    schema: {
      tags: ["Projects"],
      summary: "Update a project by ID",
      description: "Update an existing project by its ID",
      params: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the project to update" }
        },
        required: ["id"]
      },
      body: {
        type: "object",
        properties: projectInputSchema.properties
      },
      response: {
        200: {
          description: "Project updated successfully",
          ...projectSchema
        },
        400: {
          description: "Invalid input",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        },
        404: {
          description: "Project not found",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        }
      }
    }
  }, async (request, reply) => {
    return await updateProject(request, reply);
  });

  // DELETE /api/projects/:id
  fastify.delete("/:id", {
    schema: {
      tags: ["Projects"],
      summary: "Delete a project by ID",
      description: "Delete a project from the portfolio",
      params: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the project to delete" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Project deleted successfully",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        404: {
          description: "Project not found",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        },
        500: {
          description: "Server error",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        }
      }
    }
  }, async (request, reply) => {
    return await deleteProject(request, reply);
  });
}

module.exports = projectRoutes;

