/**
 * @file routes/contactRoutes.js
 * @description Fastify routes for contact-related endpoints.
 * Defines API routes for contact form and communication.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const { sendContactEmail, sendSMSNotification } = require("../controllers/contactController");

async function contactRoutes(fastify, options) {
  // Schema definitions for Swagger
  const contactEmailSchema = {
    type: "object",
    required: ["name", "email", "subject", "message"],
    properties: {
      name: { type: "string", description: "Name of the sender" },
      email: { type: "string", format: "email", description: "Email address of the sender" },
      subject: { type: "string", description: "Subject of the message" },
      message: { type: "string", description: "Content of the message" }
    }
  };

  const smsSchema = {
    type: "object",
    required: ["phone", "message"],
    properties: {
      phone: { type: "string", description: "Phone number to send SMS to" },
      message: { type: "string", description: "Content of the SMS message" }
    }
  };

  // POST /api/contact
  fastify.post("/", {
    schema: {
      tags: ["Contact"],
      summary: "Send contact form email",
      description: "Send an email through the contact form",
      body: contactEmailSchema,
      response: {
        200: {
          description: "Email sent successfully",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        },
        400: {
          description: "Invalid input (e.g., missing fields, invalid email format)",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        },
        500: {
          description: "Failed to send email",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        }
      }
    }
  }, async (request, reply) => {
    return await sendContactEmail(request, reply);
  });

  // POST /api/contact/sms
  fastify.post("/sms", {
    schema: {
      tags: ["Contact"],
      summary: "Send SMS notification (placeholder)",
      description: "Send SMS notification (placeholder for future SMS integration)",
      body: smsSchema,
      response: {
        501: {
          description: "SMS functionality not implemented yet or not enabled",
          type: "object",
          properties: {
            error: { type: "string" }
          }
        }
      }
    }
  }, async (request, reply) => {
    return await sendSMSNotification(request, reply);
  });
}

module.exports = contactRoutes;

