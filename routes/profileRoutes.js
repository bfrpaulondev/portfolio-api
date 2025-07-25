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

// @route GET /api/profile
// @desc Get profile information
// @access Public
router.get("/", getProfile);

// @route POST /api/profile
// @desc Create or update profile information
// @access Private (admin only, implement authentication later)
router.post("/", createOrUpdateProfile);

module.exports = router;

