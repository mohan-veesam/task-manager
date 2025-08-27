const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Owner manager
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Assigned users
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);
