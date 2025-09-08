import express from 'express';
import { createDefaultProject, getProject, getAllProjects } from '../controllers/projectController.js';

const router = express.Router();

router.post('/create-default', createDefaultProject);
router.get('/:id', getProject);
s
router.get('/', getAllProjects);

export default router;
