const express = require("express");
const router = express.Router();
const { createProject, getAllProjects, deleteProject, updateProject } = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", createProject);
router.get("/", getAllProjects);
router.delete("/:id", deleteProject);
router.put("/:id", updateProject);

module.exports = router;