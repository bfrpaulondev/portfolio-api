/**
 * @file routes/serviceRoutes.js
 * @description Express routes for service-related endpoints.
 * Defines API routes for service management.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const express = require("express");
const router = express.Router();
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: API for managing services offered in the portfolio
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all active services
 *     tags:
 *       - Services
 *     responses:
 *       200:
 *         description: Successfully retrieved all services
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
 *                   description:
 *                     type: string
 *                   icon:
 *                     type: string
 *                   active:
 *                     type: boolean
 *       500:
 *         description: Server error
 */
// @route GET /api/services
// @desc Get all active services
// @access Public
router.get("/", getServices);

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a single service by ID
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the service to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved service information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 icon:
 *                   type: string
 *                 active:
 *                   type: boolean
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
// @route GET /api/services/:id
// @desc Get a single service by ID
// @access Public
router.get("/:id", getServiceById);

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     tags:
 *       - Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the service
 *               description:
 *                 type: string
 *                 description: Detailed description of the service
 *               icon:
 *                 type: string
 *                 description: Icon associated with the service (e.g., Font Awesome class)
 *               active:
 *                 type: boolean
 *                 description: Whether the service is active or not
 *             example:
 *               name: "Web Development"
 *               description: "Building responsive and scalable web applications."
 *               icon: "fa-code"
 *               active: true
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
// @route POST /api/services
// @desc Create a new service
// @access Private (admin only, implement authentication later)
router.post("/", createService);

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update a service by ID
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the service to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               icon:
 *                 type: string
 *               active:
 *                 type: boolean
 *             example:
 *               name: "Mobile App Development"
 *               description: "Developing native and cross-platform mobile applications."
 *               icon: "fa-mobile-alt"
 *               active: true
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
// @route PUT /api/services/:id
// @desc Update a service
// @access Private (admin only, implement authentication later)
router.put("/:id", updateService);

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the service to delete
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
// @route DELETE /api/services/:id
// @desc Delete a service
// @access Private (admin only, implement authentication later)
router.delete("/:id", deleteService);

module.exports = router;


