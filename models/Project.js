/**
 * @file models/Project.js
 * @description Mongoose model for portfolio projects.
 * Defines the schema for project data.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
  }],
  githubUrl: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Project", projectSchema);

