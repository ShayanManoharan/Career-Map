import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  interests: string[];
  skills: string[];
  dreamJobs: string[];
  recommendedMajors: string[];
  recommendedMinors: string[];
  coursePlan: {
    year: number;
    courses: string[];
  }[];
  extracurriculars: {
    type: string;
    name: string;
    description: string;
  }[];
  summerPrograms: {
    type: string;
    name: string;
    description: string;
    year: number;
  }[];
  certifications: {
    name: string;
    provider: string;
    status: 'planned' | 'in-progress' | 'completed';
  }[];
  linkedInProfile?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  interests: [{ type: String }],
  skills: [{ type: String }],
  dreamJobs: [{ type: String }],
  recommendedMajors: [{ type: String }],
  recommendedMinors: [{ type: String }],
  coursePlan: [{
    year: { type: Number, required: true },
    courses: [{ type: String }]
  }],
  extracurriculars: [{
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String }
  }],
  summerPrograms: [{
    type: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    year: { type: Number, required: true }
  }],
  certifications: [{
    name: { type: String, required: true },
    provider: { type: String, required: true },
    status: { type: String, enum: ['planned', 'in-progress', 'completed'], default: 'planned' }
  }],
  linkedInProfile: { type: String },
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema); 