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
exports.getProjects = async (request, reply) => {
  try {
    const projects = await Project.find({ isActive: true });
    return reply.status(200).send(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

// @route GET /api/projects/:id
// @desc Get a single project by ID
// @access Public
exports.getProjectById = async (request, reply) => {
  try {
    const project = await Project.findById(request.params.id);
    if (!project) {
      return reply.status(404).send({ error: "Project not found." });
    }
    return reply.status(200).send(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

// @route GET /api/projects/category/:category
// @desc Get projects by category
// @access Public
exports.getProjectsByCategory = async (request, reply) => {
  try {
    const projects = await Project.find({ 
      category: request.params.category, 
      isActive: true 
    });
    return reply.status(200).send(projects);
  } catch (error) {
    console.error("Error fetching projects by category:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

// @route POST /api/projects
// @desc Create a new project
// @access Private (admin only, implement authentication later)
exports.createProject = async (request, reply) => {
  const { title, description, category, imageUrl, projectUrl, active } = request.body;

  try {
    const newProject = new Project({
      title,
      description,
      category,
      imageUrl,
      projectUrl,
      active,
    });

    const project = await newProject.save();
    return reply.status(201).send(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

// @route PUT /api/projects/:id
// @desc Update a project
// @access Private (admin only, implement authentication later)
exports.updateProject = async (request, reply) => {
  const { title, description, category, imageUrl, projectUrl, active } = request.body;

  try {
    const project = await Project.findByIdAndUpdate(
      request.params.id,
      { title, description, category, imageUrl, projectUrl, active },
      { new: true }
    );

    if (!project) {
      return reply.status(404).send({ error: "Project not found." });
    }

    return reply.status(200).send(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

// @route DELETE /api/projects/:id
// @desc Delete a project
// @access Private (admin only, implement authentication later)
exports.deleteProject = async (request, reply) => {
  try {
    const project = await Project.findByIdAndDelete(request.params.id);

    if (!project) {
      return reply.status(404).send({ error: "Project not found." });
    }

    return reply.status(200).send({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

