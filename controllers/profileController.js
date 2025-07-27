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
exports.getProfile = async (request, reply) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return reply.status(404).send({ error: "Profile not found." });
    }
    return reply.status(200).send(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

// @route POST /api/profile
// @desc Create or update profile information
// @access Private (admin only, implement authentication later)
exports.createOrUpdateProfile = async (request, reply) => {
  const {
    name,
    title,
    bio,
    contactEmail,
    linkedin,
    github,
  } = request.body;

  const profileFields = {
    name,
    title,
    bio,
    contactEmail,
    linkedin,
    github,
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
      return reply.status(200).send(profile);
    } else {
      // Create
      profile = new Profile(profileFields);
      await profile.save();
      return reply.status(201).send(profile);
    }
  } catch (error) {
    console.error("Error creating or updating profile:", error);
    return reply.status(500).send({ error: "Server error." });
  }
};

