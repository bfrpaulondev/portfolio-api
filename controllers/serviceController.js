/**
 * @file controllers/serviceController.js
 * @description Controller for handling service-related API requests.
 * Provides logic for managing services offered.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const Service = require("../models/Service");

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all active services
 *     tags:
 *       - Services
 *     responses:
 *       200:
 *         description: Successfully retrieved all services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   icon:
 *                     type: string
 *                   active:
 *                     type: boolean
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a single service by ID
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the service to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved service information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 icon:
 *                   type: string
 *                 active:
 *                   type: boolean
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/services:
 *   post:
 *     summary: Create a new service
 *     tags:
 *       - Services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: Name of the service
 *               description:
 *                 type: string
 *                 description: Detailed description of the service
 *               icon:
 *                 type: string
 *                 description: Icon associated with the service (e.g., Font Awesome class)
 *               active:
 *                 type: boolean
 *                 description: Whether the service is active or not
 *             example:
 *               title: "Web Development"
 *               description: "Building responsive and scalable web applications."
 *               icon: "fa-code"
 *               active: true
 *     responses:
 *       201:
 *         description: Service created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/services/{id}:
 *   put:
 *     summary: Update a service by ID
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the service to update
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
 *               icon:
 *                 type: string
 *               active:
 *                 type: boolean
 *             example:
 *               name: "Mobile App Development"
 *               description: "Developing native and cross-platform mobile applications."
 *               icon: "fa-mobile-alt"
 *               active: true
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/services/{id}:
 *   delete:
 *     summary: Delete a service by ID
 *     tags:
 *       - Services
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the service to delete
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       404:
 *         description: Service not found
 *       500:
 *         description: Server error
 */
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


