/**
 * @file routes/technologyRoutes.js
 * @description Express routes for technology-related endpoints.
 * Defines API routes for technology management.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const express = require("express");
const router = express.Router();
const {
  getTechnologies,
  getTechnologiesByCategory,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} = require("../controllers/technologyController");

/**
 * @swagger
 * tags:
 *   name: Technologies
 *   description: API for managing technologies used in the portfolio
 */

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
router.get("/", getTechnologies);

/**
 * @swagger
 * /api/technologies/category/{category}:
 *   get:
 *     summary: Get technologies by category
 *     tags:
 *       - Technologies
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category of technologies to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved technologies by category
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
 *       404:
 *         description: No technologies found for the given category
 *       500:
 *         description: Server error
 */
// @route GET /api/technologies/category/:category
// @desc Get technologies by category
// @access Public
router.get("/category/:category", getTechnologiesByCategory);

/**
 * @swagger
 * /api/technologies:
 *   post:
 *     summary: Create a new technology
 *     tags:
 *       - Technologies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the technology
 *               category:
 *                 type: string
 *                 description: Category of the technology (e.g., Frontend, Backend, Database)
 *               icon:
 *                 type: string
 *                 description: Icon associated with the technology (e.g., Font Awesome class)
 *               active:
 *                 type: boolean
 *                 description: Whether the technology is active or not
 *             example:
 *               name: "React"
 *               category: "Frontend"
 *               icon: "fa-react"
 *               active: true
 *     responses:
 *       201:
 *         description: Technology created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
// @route POST /api/technologies
// @desc Create a new technology
// @access Private (admin only, implement authentication later)
router.post("/", createTechnology);

/**
 * @swagger
 * /api/technologies/{id}:
 *   put:
 *     summary: Update a technology by ID
 *     tags:
 *       - Technologies
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the technology to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               icon:
 *                 type: string
 *               active:
 *                 type: boolean
 *             example:
 *               name: "Node.js"
 *               category: "Backend"
 *               icon: "fa-node-js"
 *               active: true
 *     responses:
 *       200:
 *         description: Technology updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Technology not found
 *       500:
 *         description: Server error
 */
// @route PUT /api/technologies/:id
// @desc Update a technology
// @access Private (admin only, implement authentication later)
router.put("/:id", updateTechnology);

/**
 * @swagger
 * /api/technologies/{id}:
 *   delete:
 *     summary: Delete a technology by ID
 *     tags:
 *       - Technologies
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the technology to delete
 *     responses:
 *       200:
 *         description: Technology deleted successfully
 *       404:
 *         description: Technology not found
 *       500:
 *         description: Server error
 */
// @route DELETE /api/technologies/:id
// @desc Delete a technology
// @access Private (admin only, implement authentication later)
router.delete("/:id", deleteTechnology);

module.exports = router;


