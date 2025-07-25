/**
 * @file routes/projectRoutes.js
 * @description Express routes for project-related endpoints.
 * Defines API routes for project management.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProjectById,
  getProjectsByCategory,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// @route GET /api/projects
// @desc Get all active projects
// @access Public
router.get("/", getProjects);

// @route GET /api/projects/category/:category
// @desc Get projects by category
// @access Public
router.get("/category/:category", getProjectsByCategory);

// @route GET /api/projects/:id
// @desc Get a single project by ID
// @access Public
router.get("/:id", getProjectById);

// @route POST /api/projects
// @desc Create a new project
// @access Private (admin only, implement authentication later)
router.post("/", createProject);

// @route PUT /api/projects/:id
// @desc Update a project
// @access Private (admin only, implement authentication later)
router.put("/:id", updateProject);

// @route DELETE /api/projects/:id
// @desc Delete a project
// @access Private (admin only, implement authentication later)
router.delete("/:id", deleteProject);

module.exports = router;

