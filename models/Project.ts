import mongoose from 'mongoose';
import type { Project } from '@/lib/types/project';

const projectSchema = new mongoose.Schema<Project>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String },
    category: { type: String },
    images: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    createdAt: { type: String, required: true },
  },
  { timestamps: false }
);

const ProjectModel = mongoose.models.Project || mongoose.model<Project>('Project', projectSchema);

export default ProjectModel;
