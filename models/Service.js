const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  icon: { type: String },
  link: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Service", ServiceSchema);
