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

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing portfolio projects
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all active projects
 *     tags:
 *       - Projects
 *     responses:
 *       200:
 *         description: Successfully retrieved all projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   category:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *                   projectUrl:
 *                     type: string
 *                   active:
 *                     type: boolean
 *       500:
 *         description: Server error
 */
// @route GET /api/projects
// @desc Get all active projects
// @access Public
router.get("/", getProjects);

/**
 * @swagger
 * /api/projects/category/{category}:
 *   get:
 *     summary: Get projects by category
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: Category of projects to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved projects by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   category:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *                   projectUrl:
 *                     type: string
 *                   active:
 *                     type: boolean
 *       404:
 *         description: No projects found for the given category
 *       500:
 *         description: Server error
 */
// @route GET /api/projects/category/:category
// @desc Get projects by category
// @access Public
router.get("/category/:category", getProjectsByCategory);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get a single project by ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved project information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 category:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 projectUrl:
 *                   type: string
 *                 active:
 *                   type: boolean
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server error
 */
// @route GET /api/projects/:id
// @desc Get a single project by ID
// @access Public
router.get("/:id", getProjectById);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *               - imageUrl
 *               - projectUrl
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the project
 *               description:
 *                 type: string
 *                 description: Detailed description of the project
 *               category:
 *                 type: string
 *                 description: Category of the project (e.g., Web Development, Mobile App)
 *               imageUrl:
 *                 type: string
 *                 description: URL of the project image
 *               projectUrl:
 *                 type: string
 *                 description: URL to the live project or repository
 *               active:
 *                 type: boolean
 *                 description: Whether the project is active or not
 *             example:
 *               title: "My Awesome Portfolio Website"
 *               description: "A personal portfolio website built with React and Node.js."
 *               category: "Web Development"
 *               imageUrl: "https://example.com/portfolio.jpg"
 *               projectUrl: "https://myportfolio.com"
 *               active: true
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
// @route POST /api/projects
// @desc Create a new project
// @access Private (admin only, implement authentication later)
router.post("/", createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               projectUrl:
 *                 type: string
 *               active:
 *                 type: boolean
 *             example:
 *               title: "Updated Portfolio Website"
 *               description: "An updated personal portfolio website with new features."
 *               category: "Web Development"
 *               imageUrl: "https://example.com/updated_portfolio.jpg"
 *               projectUrl: "https://myupdatedportfolio.com"
 *               active: true
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server error
 */
// @route PUT /api/projects/:id
// @desc Update a project
// @access Private (admin only, implement authentication later)
router.put("/:id", updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the project to delete
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 *       500:
 *         description: Server error
 */
// @route DELETE /api/projects/:id
// @desc Delete a project
// @access Private (admin only, implement authentication later)
router.delete("/:id", deleteProject);

module.exports = router;


