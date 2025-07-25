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

// @route GET /api/technologies
// @desc Get all active technologies
// @access Public
router.get("/", getTechnologies);

// @route GET /api/technologies/category/:category
// @desc Get technologies by category
// @access Public
router.get("/category/:category", getTechnologiesByCategory);

// @route POST /api/technologies
// @desc Create a new technology
// @access Private (admin only, implement authentication later)
router.post("/", createTechnology);

// @route PUT /api/technologies/:id
// @desc Update a technology
// @access Private (admin only, implement authentication later)
router.put("/:id", updateTechnology);

// @route DELETE /api/technologies/:id
// @desc Delete a technology
// @access Private (admin only, implement authentication later)
router.delete("/:id", deleteTechnology);

module.exports = router;

