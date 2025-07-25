/**
 * @file models/Technology.js
 * @description Mongoose model for technologies and tools.
 * Defines the schema for technology data.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const mongoose = require("mongoose");

const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Other"],
  },
  proficiencyLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
    default: "Intermediate",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Technology", technologySchema);

