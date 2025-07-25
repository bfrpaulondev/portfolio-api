/**
 * @file models/Service.js
 * @description Mongoose model for services offered.
 * Defines the schema for service data.
 * @author Bruno Paulon
 * @version 1.0.0
 */

const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    default: "Custom Quote",
  },
  icon: {
    type: String,
    default: "bi-gear",
  },
  link: {
    type: String,
    default: "#",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Service", serviceSchema);

