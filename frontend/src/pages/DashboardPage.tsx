import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import axios from 'axios';

interface FutureMap {
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
}

const DashboardPage: React.FC = () => {
  const [futureMap, setFutureMap] = useState<FutureMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFutureMap = async () => {
      try {
        setLoading(true);
        // For testing purposes, use a mock user ID if not available
        const userId = localStorage.getItem('userId') || '65f8a1b2c3d4e5f6a7b8c9d0';
        
        const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        
        // Check if the response data has the expected structure
        if (response.data && 
            Array.isArray(response.data.recommendedMajors) && 
            Array.isArray(response.data.recommendedMinors) && 
            Array.isArray(response.data.coursePlan) && 
            Array.isArray(response.data.extracurriculars) && 
            Array.isArray(response.data.summerPrograms) && 
            Array.isArray(response.data.certifications)) {
          setFutureMap(response.data);
        } else {
          // If the data structure is not as expected, create a mock data
          setFutureMap({
            recommendedMajors: ['Computer Science', 'Data Science', 'Software Engineering'],
            recommendedMinors: ['Mathematics', 'Business', 'Psychology'],
            coursePlan: [
              { year: 1, courses: ['Introduction to Programming', 'Calculus I', 'Data Structures'] },
              { year: 2, courses: ['Algorithms', 'Database Systems', 'Web Development'] },
              { year: 3, courses: ['Machine Learning', 'Software Engineering', 'Cloud Computing'] },
              { year: 4, courses: ['AI', 'Capstone Project', 'Internship'] }
            ],
            extracurriculars: [
              { type: 'Club', name: 'Coding Club', description: 'Weekly coding challenges and workshops' },
              { type: 'Hackathon', name: 'Tech Innovation', description: 'Annual hackathon for innovative solutions' }
            ],
            summerPrograms: [
              { type: 'Internship', name: 'Google Summer of Code', description: 'Open source development', year: 2 },
              { type: 'Program', name: 'AI Research Lab', description: 'Research in artificial intelligence', year: 3 }
            ],
            certifications: [
              { name: 'AWS Certified Developer', provider: 'Amazon', status: 'planned' },
              { name: 'Google Cloud Professional', provider: 'Google', status: 'in-progress' },
              { name: 'Microsoft Azure Fundamentals', provider: 'Microsoft', status: 'completed' }
            ]
          });
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching future map:', err);
        setError('Failed to load your future map. Please try again later.');
        setLoading(false);
        
        // Set mock data in case of API error
        setFutureMap({
          recommendedMajors: ['Computer Science', 'Data Science', 'Software Engineering'],
          recommendedMinors: ['Mathematics', 'Business', 'Psychology'],
          coursePlan: [
            { year: 1, courses: ['Introduction to Programming', 'Calculus I', 'Data Structures'] },
            { year: 2, courses: ['Algorithms', 'Database Systems', 'Web Development'] },
            { year: 3, courses: ['Machine Learning', 'Software Engineering', 'Cloud Computing'] },
            { year: 4, courses: ['AI', 'Capstone Project', 'Internship'] }
          ],
          extracurriculars: [
            { type: 'Club', name: 'Coding Club', description: 'Weekly coding challenges and workshops' },
            { type: 'Hackathon', name: 'Tech Innovation', description: 'Annual hackathon for innovative solutions' }
          ],
          summerPrograms: [
            { type: 'Internship', name: 'Google Summer of Code', description: 'Open source development', year: 2 },
            { type: 'Program', name: 'AI Research Lab', description: 'Research in artificial intelligence', year: 3 }
          ],
          certifications: [
            { name: 'AWS Certified Developer', provider: 'Amazon', status: 'planned' },
            { name: 'Google Cloud Professional', provider: 'Google', status: 'in-progress' },
            { name: 'Microsoft Azure Fundamentals', provider: 'Microsoft', status: 'completed' }
          ]
        });
      }
    };

    fetchFutureMap();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error && !futureMap) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Personalized Future Map
        </Typography>

        {error && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            {error} Showing mock data for demonstration purposes.
          </Alert>
        )}

        <Stack spacing={3}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {/* College Recommendations */}
            <Box sx={{ flex: '1 1 calc(50% - 24px)', minWidth: '300px', maxWidth: '100%' }}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Recommended College Path
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Majors:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {futureMap?.recommendedMajors.map((major) => (
                      <Chip key={major} label={major} color="primary" />
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Minors:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {futureMap?.recommendedMinors.map((minor) => (
                      <Chip key={minor} label={minor} color="secondary" />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Box>

            {/* Course Plan */}
            <Box sx={{ flex: '1 1 calc(50% - 24px)', minWidth: '300px', maxWidth: '100%' }}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  4-Year Course Plan
                </Typography>
                <List>
                  {futureMap?.coursePlan.map((year) => (
                    <React.Fragment key={year.year}>
                      <ListItem>
                        <ListItemText
                          primary={`Year ${year.year}`}
                          secondary={year.courses.join(', ')}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {/* Extracurricular Activities */}
            <Box sx={{ flex: '1 1 calc(50% - 24px)', minWidth: '300px', maxWidth: '100%' }}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Recommended Extracurriculars
                </Typography>
                <List>
                  {futureMap?.extracurriculars.map((activity, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1">{activity.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {activity.description}
                        </Typography>
                        <Chip
                          label={activity.type}
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </List>
              </Paper>
            </Box>

            {/* Summer Programs */}
            <Box sx={{ flex: '1 1 calc(50% - 24px)', minWidth: '300px', maxWidth: '100%' }}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Summer Programs & Internships
                </Typography>
                <List>
                  {futureMap?.summerPrograms.map((program, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle1">{program.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {program.description}
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                          <Chip label={program.type} size="small" />
                          <Chip label={`Year ${program.year}`} size="small" />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </List>
              </Paper>
            </Box>
          </Box>

          {/* Certifications */}
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recommended Certifications
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {futureMap?.certifications.map((cert, index) => (
                  <Box key={index} sx={{ flex: '1 1 calc(33.333% - 16px)', minWidth: '250px', maxWidth: '100%' }}>
                    <Card>
                      <CardContent>
                        <Typography variant="subtitle1">{cert.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Provider: {cert.provider}
                        </Typography>
                        <Chip
                          label={cert.status}
                          size="small"
                          color={
                            cert.status === 'completed'
                              ? 'success'
                              : cert.status === 'in-progress'
                              ? 'warning'
                              : 'default'
                          }
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default DashboardPage; 