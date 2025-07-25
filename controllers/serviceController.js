/**
 * @file controllers/serviceController.js
 * @description Controller for handling service-related API requests.
 * Provides logic for managing services offered.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const Service = require("../models/Service");

// @route GET /api/services
// @desc Get all active services
// @access Public
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @route GET /api/services/:id
// @desc Get a single service by ID
// @access Public
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @route POST /api/services
// @desc Create a new service
// @access Private (admin only, implement authentication later)
exports.createService = async (req, res) => {
  const { title, description, price, icon, link } = req.body;

  try {
    const newService = new Service({
      title,
      description,
      price,
      icon,
      link,
    });

    const service = await newService.save();
    res.status(201).json(service);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @route PUT /api/services/:id
// @desc Update a service
// @access Private (admin only, implement authentication later)
exports.updateService = async (req, res) => {
  const { title, description, price, icon, link, isActive } = req.body;

  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, price, icon, link, isActive },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    res.status(200).json(service);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @route DELETE /api/services/:id
// @desc Delete a service
// @access Private (admin only, implement authentication later)
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    res.status(200).json({ message: "Service deleted successfully." });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Server error." });
  }
};

