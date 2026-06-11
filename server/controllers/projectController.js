const Project = require('../models/project');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const projectsFilePath = path.join(__dirname, '../projects.json');

// Helper to read projects from JSON file
const readProjectsFromFile = () => {
  try {
    if (!fs.existsSync(projectsFilePath)) {
      const seedProjects = [
        {
          _id: "seed-1",
          title: "Personal Portfolio Website",
          description: "A sleek, responsive developer portfolio showcasing projects and contact details.",
          image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600",
          technologies: ["React", "Node.js", "Express"],
          githubLink: "https://github.com",
          liveLink: "https://example.com",
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      fs.writeFileSync(projectsFilePath, JSON.stringify(seedProjects, null, 2));
      return seedProjects;
    }
    const data = fs.readFileSync(projectsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading projects.json:', err);
    return [];
  }
};

// Helper to write projects to JSON file
const writeProjectsToFile = (projects) => {
  try {
    fs.writeFileSync(projectsFilePath, JSON.stringify(projects, null, 2));
  } catch (err) {
    console.error('Error writing projects.json:', err);
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const projects = readProjectsFromFile();
      projects.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      return res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
      });
    }

    const projects = await Project.find({}).sort({ featured: -1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res, next) => {
  try {
    const { title, description, image, technologies, githubLink, liveLink, featured } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const projects = readProjectsFromFile();
      const newProject = {
        _id: 'local-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        title,
        description,
        image,
        technologies,
        githubLink: githubLink || '',
        liveLink: liveLink || '',
        featured: featured || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      projects.push(newProject);
      writeProjectsToFile(projects);
      return res.status(201).json({
        success: true,
        data: newProject,
      });
    }

    const project = await Project.create({
      title,
      description,
      image,
      technologies,
      githubLink,
      liveLink,
      featured,
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, image, technologies, githubLink, liveLink, featured } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const projects = readProjectsFromFile();
      const index = projects.findIndex((p) => p._id === id);
      if (index === -1) {
        res.status(404);
        throw new Error(`Project with ID ${id} not found`);
      }
      const updatedProject = {
        ...projects[index],
        title: title !== undefined ? title : projects[index].title,
        description: description !== undefined ? description : projects[index].description,
        image: image !== undefined ? image : projects[index].image,
        technologies: technologies !== undefined ? technologies : projects[index].technologies,
        githubLink: githubLink !== undefined ? githubLink : projects[index].githubLink,
        liveLink: liveLink !== undefined ? liveLink : projects[index].liveLink,
        featured: featured !== undefined ? featured : projects[index].featured,
        updatedAt: new Date().toISOString()
      };
      projects[index] = updatedProject;
      writeProjectsToFile(projects);
      return res.status(200).json({
        success: true,
        data: updatedProject,
      });
    }

    let project = await Project.findById(id);

    if (!project) {
      res.status(404);
      throw new Error(`Project with ID ${id} not found`);
    }

    project = await Project.findByIdAndUpdate(
      id,
      { title, description, image, technologies, githubLink, liveLink, featured },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState !== 1) {
      const projects = readProjectsFromFile();
      const index = projects.findIndex((p) => p._id === id);
      if (index === -1) {
        res.status(404);
        throw new Error(`Project with ID ${id} not found`);
      }
      projects.splice(index, 1);
      writeProjectsToFile(projects);
      return res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      res.status(404);
      throw new Error(`Project with ID ${id} not found`);
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
