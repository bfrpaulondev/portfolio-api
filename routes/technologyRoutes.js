/**
 * @file routes/technologyRoutes.js
 * @description Fastify routes for technology-related endpoints.
 * Defines API routes for technology management.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const {
  getTechnologies,
  getTechnologiesByCategory,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} = require("../controllers/technologyController");

async function technologyRoutes(fastify, options) {
  // Schema definitions for Swagger
  const technologySchema = {
    type: "object",
    properties: {
      _id: { type: "string" },
      name: { type: "string" },
      category: { type: "string" },
      icon: { type: "string" },
      active: { type: "boolean" }
    }
  };

  const technologyInputSchema = {
    type: "object",
    required: ["name", "category"],
    properties: {
      name: { type: "string", description: "Name of the technology" },
      category: { type: "string", description: "Category of the technology (e.g., Frontend, Backend, Database)" },
      icon: { type: "string", description: "Icon associated with the technology (e.g., Font Awesome class)" },
      active: { type: "boolean", description: "Whether the technology is active or not" }
    }
  };

  // GET /api/technologies
  fastify.get("/", {
    schema: {
      tags: ["Technologies"],
      summary: "Get all active technologies",
      description: "Retrieve all active technologies used in the portfolio",
      response: {
        200: {
          description: "Successfully retrieved all technologies",
          type: "array",
          items: technologySchema
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
    return await getTechnologies(request, reply);
  });

  // GET /api/technologies/category/:category
  fastify.get("/category/:category", {
    schema: {
      tags: ["Technologies"],
      summary: "Get technologies by category",
      description: "Retrieve technologies filtered by category",
      params: {
        type: "object",
        properties: {
          category: { type: "string", description: "Category of technologies to retrieve" }
        },
        required: ["category"]
      },
      response: {
        200: {
          description: "Successfully retrieved technologies by category",
          type: "array",
          items: technologySchema
        },
        404: {
          description: "No technologies found for the given category",
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
    return await getTechnologiesByCategory(request, reply);
  });

  // POST /api/technologies
  fastify.post("/", {
    schema: {
      tags: ["Technologies"],
      summary: "Create a new technology",
      description: "Create a new technology in the portfolio",
      body: technologyInputSchema,
      response: {
        201: {
          description: "Technology created successfully",
          ...technologySchema
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
    return await createTechnology(request, reply);
  });

  // PUT /api/technologies/:id
  fastify.put("/:id", {
    schema: {
      tags: ["Technologies"],
      summary: "Update a technology by ID",
      description: "Update an existing technology by its ID",
      params: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the technology to update" }
        },
        required: ["id"]
      },
      body: {
        type: "object",
        properties: technologyInputSchema.properties
      },
      response: {
        200: {
          description: "Technology updated successfully",
          ...technologySchema
        },
        400: {
          description: "Invalid input",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        },
        404: {
          description: "Technology not found",
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
    return await updateTechnology(request, reply);
  });

  // DELETE /api/technologies/:id
  fastify.delete("/:id", {
    schema: {
      tags: ["Technologies"],
      summary: "Delete a technology by ID",
      description: "Delete a technology from the portfolio",
      params: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the technology to delete" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Technology deleted successfully",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        404: {
          description: "Technology not found",
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
    return await deleteTechnology(request, reply);
  });
}

module.exports = technologyRoutes;

