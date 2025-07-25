/**
 * @file controllers/projectController.js
 * @description Controller for handling project-related API requests.
 * Provides logic for managing portfolio projects.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const Project = require("../models/Project");

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

