/**
 * @file routes/serviceRoutes.js
 * @description Fastify routes for service-related endpoints.
 * Defines API routes for service management.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

async function serviceRoutes(fastify, options) {
  // Schema definitions for Swagger
  const serviceSchema = {
    type: "object",
    properties: {
      _id: { type: "string" },
      name: { type: "string" },
      description: { type: "string" },
      icon: { type: "string" },
      active: { type: "boolean" }
    }
  };

  const serviceInputSchema = {
    type: "object",
    required: ["name", "description"],
    properties: {
      name: { type: "string", description: "Name of the service" },
      description: { type: "string", description: "Detailed description of the service" },
      icon: { type: "string", description: "Icon associated with the service (e.g., Font Awesome class)" },
      active: { type: "boolean", description: "Whether the service is active or not" }
    }
  };

  // GET /api/services
  fastify.get("/", {
    schema: {
      tags: ["Services"],
      summary: "Get all active services",
      description: "Retrieve all active services offered in the portfolio",
      response: {
        200: {
          description: "Successfully retrieved all services",
          type: "array",
          items: serviceSchema
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
    return await getServices(request, reply);
  });

  // GET /api/services/:id
  fastify.get("/:id", {
    schema: {
      tags: ["Services"],
      summary: "Get a single service by ID",
      description: "Retrieve a specific service by its ID",
      params: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the service to retrieve" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Successfully retrieved service information",
          ...serviceSchema
        },
        404: {
          description: "Service not found",
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
    return await getServiceById(request, reply);
  });

  // POST /api/services
  fastify.post("/", {
    schema: {
      tags: ["Services"],
      summary: "Create a new service",
      description: "Create a new service in the portfolio",
      body: serviceInputSchema,
      response: {
        201: {
          description: "Service created successfully",
          ...serviceSchema
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
    return await createService(request, reply);
  });

  // PUT /api/services/:id
  fastify.put("/:id", {
    schema: {
      tags: ["Services"],
      summary: "Update a service by ID",
      description: "Update an existing service by its ID",
      params: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the service to update" }
        },
        required: ["id"]
      },
      body: {
        type: "object",
        properties: serviceInputSchema.properties
      },
      response: {
        200: {
          description: "Service updated successfully",
          ...serviceSchema
        },
        400: {
          description: "Invalid input",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        },
        404: {
          description: "Service not found",
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
    return await updateService(request, reply);
  });

  // DELETE /api/services/:id
  fastify.delete("/:id", {
    schema: {
      tags: ["Services"],
      summary: "Delete a service by ID",
      description: "Delete a service from the portfolio",
      params: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the service to delete" }
        },
        required: ["id"]
      },
      response: {
        200: {
          description: "Service deleted successfully",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        404: {
          description: "Service not found",
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
    return await deleteService(request, reply);
  });
}

module.exports = serviceRoutes;

