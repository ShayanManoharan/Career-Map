import OpenAI from 'openai';
import { IUser } from '../models/User';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIRecommendations {
  majors: string[];
  minors: string[];
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
}

export async function generateRecommendations(user: IUser): Promise<AIRecommendations> {
  const prompt = `Based on the following student profile, generate personalized recommendations:
    Interests: ${user.interests.join(', ')}
    Skills: ${user.skills.join(', ')}
    Dream Jobs: ${user.dreamJobs.join(', ')}

    Please provide recommendations for:
    1. College majors and minors
    2. A 4-year high school course plan
    3. Extracurricular activities
    4. Summer programs
    5. Relevant certifications

    Format the response as a JSON object with the following structure:
    {
      "majors": string[],
      "minors": string[],
      "coursePlan": { year: number, courses: string[] }[],
      "extracurriculars": { type: string, name: string, description: string }[],
      "summerPrograms": { type: string, name: string, description: string, year: number }[],
      "certifications": { name: string, provider: string, status: string }[]
    }`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
    });

    const recommendations = JSON.parse(completion.choices[0].message.content || '{}');
    return recommendations as AIRecommendations;
  } catch (error) {
    console.error('Error generating AI recommendations:', error);
    throw new Error('Failed to generate recommendations');
  }
} 