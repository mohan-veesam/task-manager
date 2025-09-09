const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  selectedProject: { type: Schema.Types.ObjectId, ref: "Project", required: true }, // selected project
  taskAssignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true }, // selected user from that project
  taskName: { type: String, required: true },
  taskDescription: { type: String },
  taskstatus: { type: String, enum: ["To Be Done", "In Progress", "Completed"], default: "To Be Done" },
  creationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Task", taskSchema);
