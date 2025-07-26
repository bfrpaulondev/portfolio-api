/**
 * @file controllers/projectController.js
 * @description Controller for handling project-related API requests.
 * Provides logic for managing portfolio projects.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const Project = require("../models/Project");

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
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error." });
  }
};

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
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Server error." });
  }
};

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
exports.getProjectsByCategory = async (req, res) => {
  try {
    const projects = await Project.find({ 
      category: req.params.category, 
      isActive: true 
    });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error fetching projects by category:", error);
    res.status(500).json({ message: "Server error." });
  }
};

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
exports.createProject = async (req, res) => {
  const { title, description, category, image, technologies, githubUrl, liveUrl } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      category,
      image,
      technologies,
      githubUrl,
      liveUrl,
    });

    const project = await newProject.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error." });
  }
};

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
exports.updateProject = async (req, res) => {
  const { title, description, category, image, technologies, githubUrl, liveUrl, isActive } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, category, image, technologies, githubUrl, liveUrl, isActive },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Server error." });
  }
};

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
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Server error." });
  }
};


