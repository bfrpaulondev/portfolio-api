/**
 * @file routes/profileRoutes.js
 * @description Fastify routes for profile-related endpoints.
 * Defines API routes for profile management.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const { getProfile, createOrUpdateProfile } = require("../controllers/profileController");

async function profileRoutes(fastify, options) {
  // Schema definitions for Swagger
  const profileSchema = {
    type: "object",
    properties: {
      name: { type: "string" },
      title: { type: "string" },
      bio: { type: "string" },
      contactEmail: { type: "string" },
      linkedin: { type: "string" },
      github: { type: "string" }
    }
  };

  // GET /api/profile
  fastify.get("/", {
    schema: {
      tags: ["Profile"],
      summary: "Get profile information",
      description: "Retrieve user profile information",
      response: {
        200: {
          description: "Successfully retrieved profile information",
          type: "object",
          properties: profileSchema.properties
        },
        404: {
          description: "Profile not found",
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
    return await getProfile(request, reply);
  });

  // POST /api/profile
  fastify.post("/", {
    schema: {
      tags: ["Profile"],
      summary: "Create or update profile information",
      description: "Create or update user profile information",
      body: {
        type: "object",
        properties: profileSchema.properties
      },
      response: {
        200: {
          description: "Profile created or updated successfully",
          type: "object",
          properties: profileSchema.properties
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
    return await createOrUpdateProfile(request, reply);
  });
}

module.exports = profileRoutes;

