// controllers/projects.controller.js
const Project = require('../models/projectModel');

// CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { projectName, projectDescription, assignedTo } = req.body;

    if (!projectName || projectName.trim() === '') {
      return res.status(400).json({ message: 'Project name is required' });
    }

    // Ensure assignedTo is always an array
    let assignedIds = [];
    if (assignedTo && Array.isArray(assignedTo)) {
      assignedIds = assignedTo;
    }

    // createdBy comes from localStorage → frontend should send it
    const createdBy = req.body.createdBy; 

    const project = new Project({
      projectName,
      projectDescription,
      createdBy,
      assignedTo: assignedIds
    });

    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};


// GET ALL PROJECTS
exports.getAllProjects = async (req, res) => {
  try {
    // Fetch all projects
    const projects = await Project.find().populate('assignedTo', 'fullname') ;
    res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error: error.message });
  }
};


// UPDATE PROJECT
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params; // project ID from URL
    const { projectName, projectDescription, assignedTo } = req.body;
    // Normalize assignedTo (always array)
    let assignedIds = [];
    if (assignedTo) {
      if (Array.isArray(assignedTo)) {
        assignedIds = assignedTo;
      } else {
        assignedIds = [assignedTo];
      }
    }
    // Find and update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        projectName,
        projectDescription,
        assignedTo: assignedIds,
      },
      { new: true } // return updated document
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error: error.message });
  }
};


// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params; // project ID from URL

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};
