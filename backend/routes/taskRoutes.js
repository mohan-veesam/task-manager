const express = require("express");
const router = express.Router();
const { createTask, getAllTask, deleteTask, updateTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", createTask);
router.get("/", getAllTask);
router.delete("/:id", updateTask);
// router.put("/:id", deleteTask);

// router.delete("/:id", authMiddleware, deleteUser);
module.exports = router;
