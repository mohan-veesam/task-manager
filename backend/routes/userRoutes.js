const express = require("express");
const router = express.Router();
const { post, getAll, deleteUser, updateUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", post);
router.get("/", getAll);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

// router.delete("/:id", authMiddleware, deleteUser);
module.exports = router;
