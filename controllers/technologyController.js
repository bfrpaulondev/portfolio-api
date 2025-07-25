/**
 * @file controllers/technologyController.js
 * @description Controller for handling technology-related API requests.
 * Provides logic for managing technologies and tools.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const Technology = require("../models/Technology");

// @route GET /api/technologies
// @desc Get all active technologies
// @access Public
exports.getTechnologies = async (req, res) => {
  try {
    const technologies = await Technology.find({ isActive: true });
    res.status(200).json(technologies);
  } catch (error) {
    console.error("Error fetching technologies:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @route GET /api/technologies/category/:category
// @desc Get technologies by category
// @access Public
exports.getTechnologiesByCategory = async (req, res) => {
  try {
    const technologies = await Technology.find({ 
      category: req.params.category, 
      isActive: true 
    });
    res.status(200).json(technologies);
  } catch (error) {
    console.error("Error fetching technologies by category:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @route POST /api/technologies
// @desc Create a new technology
// @access Private (admin only, implement authentication later)
exports.createTechnology = async (req, res) => {
  const { name, logo, category, proficiencyLevel } = req.body;

  try {
    const newTechnology = new Technology({
      name,
      logo,
      category,
      proficiencyLevel,
    });

    const technology = await newTechnology.save();
    res.status(201).json(technology);
  } catch (error) {
    console.error("Error creating technology:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @route PUT /api/technologies/:id
// @desc Update a technology
// @access Private (admin only, implement authentication later)
exports.updateTechnology = async (req, res) => {
  const { name, logo, category, proficiencyLevel, isActive } = req.body;

  try {
    const technology = await Technology.findByIdAndUpdate(
      req.params.id,
      { name, logo, category, proficiencyLevel, isActive },
      { new: true }
    );

    if (!technology) {
      return res.status(404).json({ message: "Technology not found." });
    }

    res.status(200).json(technology);
  } catch (error) {
    console.error("Error updating technology:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @route DELETE /api/technologies/:id
// @desc Delete a technology
// @access Private (admin only, implement authentication later)
exports.deleteTechnology = async (req, res) => {
  try {
    const technology = await Technology.findByIdAndDelete(req.params.id);

    if (!technology) {
      return res.status(404).json({ message: "Technology not found." });
    }

    res.status(200).json({ message: "Technology deleted successfully." });
  } catch (error) {
    console.error("Error deleting technology:", error);
    res.status(500).json({ message: "Server error." });
  }
};

