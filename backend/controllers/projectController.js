import Project from '../models/projectModel.js';

export const createDefaultProject = async (req, res) => {
  try {
    const projectId = '68bc6841039577f548b75d4f';
    
    // Check if project already exists
    const existingProject = await Project.findById(projectId);
    if (existingProject) {
      return res.json({
        success: true,
        message: 'Project already exists',
        project: existingProject
      });
    }

    // Create new project with the specific ID
    const newProject = new Project({
      _id: projectId,
      name: 'Demo Project',
      description: 'Auto-created demo project for DesignSight',
      images: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await newProject.save();
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project: newProject
    });
  } catch (error) {
    console.error('Error creating default project:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating project', 
      error: error.message 
    });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('images');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('images');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
