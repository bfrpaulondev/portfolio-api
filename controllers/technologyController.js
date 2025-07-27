/**
 * @file controllers/technologyController.js
 * @description Controller for handling technology-related API requests.
 * Provides logic for managing technologies and tools.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const Technology = require("../models/Technology");

/**
 * @swagger
 * /api/technologies:
 *   get:
 *     summary: Get all active technologies
 *     tags:
 *       - Technologies
 *     responses:
 *       200:
 *         description: Successfully retrieved all technologies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                   icon:
 *                     type: string
 *                   active:
 *                     type: boolean
 *       500:
 *         description: Server error
 */
// @route GET /api/technologies
// @desc Get all active technologies
// @access Public
exports.getTechnologies = async (request, reply) => {
  try {
    const technologies = await Technology.find({ isActive: true });
    reply.status(200).send(technologies);
  } catch (error) {
    console.error("Error fetching technologies:", error);
    reply.status(500).send({ message: "Server error." });
