const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String },
  contactEmail: { type: String },
  linkedin: { type: String },
  github: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Profile", ProfileSchema);
