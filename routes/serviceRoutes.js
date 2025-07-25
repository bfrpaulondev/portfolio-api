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

// @route GET /api/services
// @desc Get all active services
// @access Public
router.get("/", getServices);

// @route GET /api/services/:id
// @desc Get a single service by ID
// @access Public
router.get("/:id", getServiceById);

// @route POST /api/services
// @desc Create a new service
// @access Private (admin only, implement authentication later)
router.post("/", createService);

// @route PUT /api/services/:id
// @desc Update a service
// @access Private (admin only, implement authentication later)
router.put("/:id", updateService);

// @route DELETE /api/services/:id
// @desc Delete a service
// @access Private (admin only, implement authentication later)
router.delete("/:id", deleteService);

module.exports = router;

