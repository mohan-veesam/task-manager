const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  fullname: { type: String },
  username: { type: String, unique: true },
  password: { type: String },
  role: { type: Number, enum: [1, 2, 3], default: 1 }
});

// Hash password before creating a new user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Hash password before updating a user
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    const hashed = await bcrypt.hash(update.password, 10);
    this.setUpdate({ ...update, password: hashed });
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
