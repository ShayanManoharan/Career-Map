import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [dreamJobs, setDreamJobs] = useState<string[]>([]);
  const [currentInterest, setCurrentInterest] = useState('');
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentJob, setCurrentJob] = useState('');
  const [error, setError] = useState('');

  const handleAddInterest = () => {
    if (currentInterest && !interests.includes(currentInterest)) {
      setInterests([...interests, currentInterest]);
      setCurrentInterest('');
    }
  };

  const handleAddSkill = () => {
    if (currentSkill && !skills.includes(currentSkill)) {
      setSkills([...skills, currentSkill]);
      setCurrentSkill('');
    }
  };

  const handleAddJob = () => {
    if (currentJob && !dreamJobs.includes(currentJob)) {
      setDreamJobs([...dreamJobs, currentJob]);
      setCurrentJob('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleRemoveJob = (job: string) => {
    setDreamJobs(dreamJobs.filter((j) => j !== job));
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('userId'); // You'll need to implement proper auth
      const response = await axios.put(`http://localhost:5000/api/users/profile/${userId}`, {
        interests,
        skills,
        dreamJobs,
      });
      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Tell Us About Yourself
        </Typography>
        <Typography variant="body1" gutterBottom align="center" sx={{ mb: 4 }}>
          Help us understand your interests and goals to create your personalized future map.
        </Typography>

        {/* Interests Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Interests
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Add an interest"
              value={currentInterest}
              onChange={(e) => setCurrentInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
            />
            <Button variant="contained" onClick={handleAddInterest}>
              Add
            </Button>
          </Stack>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {interests.map((interest) => (
              <Chip
                key={interest}
                label={interest}
                onDelete={() => handleRemoveInterest(interest)}
              />
            ))}
          </Box>
        </Box>

        {/* Skills Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Skills
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Add a skill"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <Button variant="contained" onClick={handleAddSkill}>
              Add
            </Button>
          </Stack>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => handleRemoveSkill(skill)}
              />
            ))}
          </Box>
        </Box>

        {/* Dream Jobs Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Dream Jobs
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Add a dream job"
              value={currentJob}
              onChange={(e) => setCurrentJob(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddJob()}
            />
            <Button variant="contained" onClick={handleAddJob}>
              Add
            </Button>
          </Stack>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {dreamJobs.map((job) => (
              <Chip
                key={job}
                label={job}
                onDelete={() => handleRemoveJob(job)}
              />
            ))}
          </Box>
        </Box>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined" onClick={() => navigate('/register')}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={interests.length === 0 || skills.length === 0 || dreamJobs.length === 0}
          >
            Generate My Future Map
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfileSetupPage; 