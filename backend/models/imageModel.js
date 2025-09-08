import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true, default: 'Anonymous' },
  content: { type: String, required: true },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

const feedbackSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Accessibility', 'Visual Hierarchy', 'Content & Copy', 'UI/UX Patterns'],
    required: true,
  },
  severity: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  feedbackText: { type: String, required: true },
  recommendation: { type: String, required: true },
  coordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  roleTags: [{ type: String, enum: ['Designer', 'Reviewer', 'Product Manager', 'Developer'] }],
  comments: [commentSchema],
});

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  feedback: [feedbackSchema],
  analysisStatus: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
}, { timestamps: true });


export const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

export default Image;