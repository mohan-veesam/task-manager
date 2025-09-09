// models/Project.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const projectSchema = new Schema({
  projectName: { type: String, required: true, trim: true },
  projectDescription: { type: String, default: '' },
  createdBy: {
    id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fullname: { type: String, required: true }
  },
  assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
