import express from 'express';
import { createDefaultProject, getProject, getAllProjects } from '../controllers/projectController.js';

const router = express.Router();

// Auto-create default project route
router.post('/create-default', createDefaultProject);

// Get specific project
router.get('/:id', getProject);

// Get all projects
router.get('/', getAllProjects);

export default router;
