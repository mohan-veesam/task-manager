const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    // 1. Find user by username
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // 2. Compare password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    // Create JWT payload
    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
      fullname: user.fullname
    };
    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET || "change_this_in_env", { expiresIn: "1h" });
    // 3. If successful
    res.json({
      message: "Login successful",
      // user: {
        token,
        id: payload.id,
        fullname: payload.fullname,
        username: payload.username,
        role: payload.role,
      // },
    });
    
  } catch (error) {
    console.error("Login error:", error);  // IMPORTANT for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
  console.log(fullname)
};
