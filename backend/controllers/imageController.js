import Image from '../models/imageModel.js';
import Project from '../models/projectModel.js';
import { analyzeImageWithAI } from '../services/aiAnalysisService.js';

export const uploadImage = async (req, res) => {
    try {
        let { projectId } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'File is required.' });
        }


        if (projectId) {
            let project = await Project.findById(projectId);
            if (!project) {
                console.log(`Project ${projectId} not found, creating it...`);
                
                
                project = new Project({
                    _id: projectId,
                    name: 'Demo Project',
                    description: 'Auto-created demo project for DesignSight',
                    images: [],
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
                
                try {
                    await project.save();
                    console.log(`Project ${projectId} created successfully`);
                } catch (createError) {
                    console.error('Error creating project:', createError);
                    return res.status(500).json({ 
                        message: 'Error creating project', 
                        error: createError.message 
                    });
                }
            }
        }

        const newImage = new Image({
            filename: file.filename,
            originalName: file.originalname,
            path: `/uploads/${file.filename}`,
            project: projectId || null,
        });

        await newImage.save();
        
        
        if (projectId) {
            const project = await Project.findById(projectId);
            project.images.push(newImage._id);
            await project.save();
        }

        res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newImage,
            path: `/uploads/${file.filename}`
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error during image upload.', 
            error: error.message 
        });
    }
};

export const getImageDetails = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found.' });
        }
        res.json(image);
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

export const triggerAIAnalysis = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found.' });
        }

        image.analysisStatus = 'processing';
        await image.save();
        res.status(202).json({ message: 'Analysis started.' });

        (async () => {
            try {
                const feedbackData = await analyzeImageWithAI(`uploads/${image.filename}`);
                image.feedback = feedbackData;
                image.analysisStatus = 'completed';
                await image.save();
            } catch (aiError) {
                console.error(`AI analysis failed for image ${image._id}:`, aiError);
                image.analysisStatus = 'failed';
                await image.save();
            }
        })();

    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};
