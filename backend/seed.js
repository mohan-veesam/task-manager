const mongoose = require("mongoose");
const User = require("./models/User"); // path to your User model
const bcrypt = require("bcryptjs");

async function seed() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/taskmanager", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Delete existing users if needed
    await User.deleteMany({});

    // Insert one admin
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      fullname: "Admin User",
      username: "admin",
      password: 1000, // pre-hash here because it's script (not using save hook)
      role: 1, // 1 = admin
    });

    await admin.save();

    console.log("✅ Admin user created!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding users:", err);
  }
}

seed();
