/**
 * @file controllers/profileController.js
 * @description Controller for handling profile-related API requests.
 * Provides logic for fetching and updating profile information.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const Profile = require("../models/Profile");

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
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found." });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error." });
  }
};

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
exports.createOrUpdateProfile = async (req, res) => {
  const {
    name,
    title,
    bio,
    email,
    phone,
    location,
    yearsOfExperience,
    projectsCompleted,
    certifications,
    awards,
  } = req.body;

  const profileFields = {
    name,
    title,
    bio,
    email,
    phone,
    location,
    yearsOfExperience,
    projectsCompleted,
    certifications,
    awards,
  };

  try {
    let profile = await Profile.findOne();

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        {},
        { $set: profileFields },
        { new: true, upsert: true }
      );
      return res.status(200).json(profile);
    } else {
      // Create
      profile = new Profile(profileFields);
      await profile.save();
      return res.status(201).json(profile);
    }
  } catch (error) {
    console.error("Error creating or updating profile:", error);
    res.status(500).json({ message: "Server error." });
  }
};


