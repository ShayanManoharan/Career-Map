import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { generateRecommendations } from '../services/aiService';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      interests: [],
      skills: [],
      dreamJobs: []
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { interests, skills, dreamJobs } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.interests = interests;
    user.skills = skills;
    user.dreamJobs = dreamJobs;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

export const generateFutureMap = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const recommendations = await generateRecommendations(user);

    // Update user with recommendations
    user.recommendedMajors = recommendations.majors;
    user.recommendedMinors = recommendations.minors;
    user.coursePlan = recommendations.coursePlan;
    user.extracurriculars = recommendations.extracurriculars;
    user.summerPrograms = recommendations.summerPrograms;
    user.certifications = recommendations.certifications;

    await user.save();
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Error generating future map', error });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
}; 