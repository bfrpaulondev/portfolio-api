/**
 * @file controllers/profileController.js
 * @description Controller for handling profile-related API requests.
 * Provides logic for fetching and updating profile information.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const Profile = require("../models/Profile");

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

