/**
 * @file models/Profile.js
 * @description Mongoose model for user profile information.
 * Defines the schema for profile data.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  projectsCompleted: {
    type: Number,
    required: true,
  },
  certifications: {
    type: Number,
    required: true,
  },
  awards: {
    type: Number,
    required: true,
  },
  // Add other profile fields as needed
});

module.exports = mongoose.model("Profile", profileSchema);

