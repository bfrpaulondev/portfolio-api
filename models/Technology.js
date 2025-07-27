const mongoose = require("mongoose");

const TechnologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  logo: { type: String },
  proficiencyLevel: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Technology", TechnologySchema);
