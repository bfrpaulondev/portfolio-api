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
exports.getServices = async (request, reply) => {
  try {
    const services = await Service.find({ isActive: true });
    return reply.status(200).send(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

// @route GET /api/services/:id
// @desc Get a single service by ID
// @access Public
exports.getServiceById = async (request, reply) => {
  try {
    const service = await Service.findById(request.params.id);
    if (!service) {
      return reply.status(404).send({ error: "Service not found." });
    }
    return reply.status(200).send(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

// @route POST /api/services
// @desc Create a new service
// @access Private (admin only, implement authentication later)
exports.createService = async (request, reply) => {
  const { name, description, icon, active } = request.body;

  try {
    const newService = new Service({
      name,
      description,
      icon,
      active,
    });

    const service = await newService.save();
    return reply.status(201).send(service);
  } catch (error) {
    console.error("Error creating service:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

// @route PUT /api/services/:id
// @desc Update a service
// @access Private (admin only, implement authentication later)
exports.updateService = async (request, reply) => {
  const { name, description, icon, active } = request.body;

  try {
    const service = await Service.findByIdAndUpdate(
      request.params.id,
      { name, description, icon, active },
      { new: true }
    );

    if (!service) {
      return reply.status(404).send({ error: "Service not found." });
    }

    return reply.status(200).send(service);
  } catch (error) {
    console.error("Error updating service:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

// @route DELETE /api/services/:id
// @desc Delete a service
// @access Private (admin only, implement authentication later)
exports.deleteService = async (request, reply) => {
  try {
    const service = await Service.findByIdAndDelete(request.params.id);

    if (!service) {
      return reply.status(404).send({ error: "Service not found." });
    }

    return reply.status(200).send({ message: "Service deleted successfully." });
  } catch (error) {
    console.error("Error deleting service:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

