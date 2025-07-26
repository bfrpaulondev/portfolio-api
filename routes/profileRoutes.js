/**
 * @file routes/profileRoutes.js
 * @description Express routes for profile-related endpoints.
 * Defines API routes for profile management.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const express = require("express");
const router = express.Router();
const { getProfile, createOrUpdateProfile } = require("../controllers/profileController");

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: API for managing user profile information
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get profile information
 *     tags:
 *       - Profile
 *     responses:
 *       200:
 *         description: Successfully retrieved profile information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 title:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 contactEmail:
 *                   type: string
 *                 linkedin:
 *                   type: string
 *                 github:
 *                   type: string
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Server error
 */
// @route GET /api/profile
// @desc Get profile information
// @access Public
router.get("/", getProfile);

/**
 * @swagger
 * /api/profile:
 *   post:
 *     summary: Create or update profile information
 *     tags:
 *       - Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               title:
 *                 type: string
 *               bio:
 *                 type: string
 *               contactEmail:
 *                 type: string
 *               linkedin:
 *                 type: string
 *               github:
 *                 type: string
 *             example:
 *               name: "Bruno Paulon"
 *               title: "Full Stack Developer"
 *               bio: "Experienced developer with a passion for building scalable web applications."
 *               contactEmail: "bruno.paulon@example.com"
 *               linkedin: "https://www.linkedin.com/in/brunopaulon"
 *               github: "https://github.com/bfrpaulondev"
 *     responses:
 *       200:
 *         description: Profile created or updated successfully
 *       500:
 *         description: Server error
 */
// @route POST /api/profile
// @desc Create or update profile information
// @access Private (admin only, implement authentication later)
router.post("/", createOrUpdateProfile);

module.exports = router;


