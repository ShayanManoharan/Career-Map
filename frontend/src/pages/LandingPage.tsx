import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Stack,
  TextField,
  Paper,
  IconButton,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Tooltip,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';
import SendIcon from '@mui/icons-material/Send';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { linkedinService, LinkedInProfile } from '../services/linkedinService';

const features = [
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: 'College Planning',
    description: 'Get personalized recommendations for college majors and minors based on your interests and goals.',
  },
  {
    icon: <TimelineIcon sx={{ fontSize: 40 }} />,
    title: 'Course Planning',
    description: 'Receive a customized 4-year high school course plan aligned with your career aspirations.',
  },
  {
    icon: <GroupIcon sx={{ fontSize: 40 }} />,
    title: 'Extracurricular Activities',
    description: 'Discover relevant clubs, competitions, and volunteer opportunities to enhance your profile.',
  },
  {
    icon: <WorkIcon sx={{ fontSize: 40 }} />,
    title: 'Career Development',
    description: 'Access summer programs, internships, and certifications to build your professional skills.',
  },
];

interface ChatMessage {
  text: string;
  isBot: boolean;
  type?: 'text' | 'majors' | 'courses' | 'extracurriculars' | 'summer' | 'certifications' | 'alumni';
  data?: any;
}

const ChatMessage: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const [showDetails, setShowDetails] = useState(false);

  const renderMessageContent = () => {
    switch (message.type) {
      case 'majors':
        return (
          <Box>
            <Typography variant="body1">{message.text}</Typography>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {message.data.majors.map((major: string) => (
                <Chip key={major} label={major} color="primary" />
              ))}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Recommended Minors:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {message.data.minors.map((minor: string) => (
                  <Chip key={minor} label={minor} color="secondary" />
                ))}
              </Box>
            </Box>
          </Box>
        );
      case 'courses':
        return (
          <Box>
            <Typography variant="body1">{message.text}</Typography>
            <List sx={{ mt: 2 }}>
              {message.data.map((year: any) => (
                <ListItem key={year.year}>
                  <ListItemText
                    primary={`Year ${year.year}`}
                    secondary={year.courses.join(', ')}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        );
      case 'extracurriculars':
        return (
          <Box>
            <Typography variant="body1">{message.text}</Typography>
            <List sx={{ mt: 2 }}>
              {message.data.map((activity: any) => (
                <ListItem key={activity.name}>
                  <ListItemText
                    primary={activity.name}
                    secondary={activity.description}
                  />
                  <Chip label={activity.type} size="small" />
                </ListItem>
              ))}
            </List>
          </Box>
        );
      case 'alumni':
        return (
          <Box>
            <Typography variant="body1">{message.text}</Typography>
            <List sx={{ mt: 2 }}>
              {message.data.map((alumni: any) => (
                <ListItem key={alumni.id}>
                  <ListItemAvatar>
                    <Avatar src={alumni.profilePicture} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${alumni.firstName} ${alumni.lastName}`}
                    secondary={alumni.headline}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<LinkedInIcon />}
                    onClick={() => window.open(`https://linkedin.com/in/${alumni.id}`, '_blank')}
                  >
                    Connect
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        );
      default:
        return <Typography variant="body1">{message.text}</Typography>;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.isBot ? 'flex-start' : 'flex-end',
        mb: 2,
      }}
    >
      <Paper
        sx={{
          p: 2,
          maxWidth: '80%',
          bgcolor: message.isBot ? 'primary.light' : 'secondary.light',
          color: message.isBot ? 'primary.contrastText' : 'secondary.contrastText',
        }}
      >
        {renderMessageContent()}
      </Paper>
    </Box>
  );
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hi! I'm your AI career advisor. Tell me about your interests, skills, and dream jobs, and I'll help you plan your future!",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [linkedinProfile, setLinkedinProfile] = useState<LinkedInProfile | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('source') === 'linkedin') {
      const profile = localStorage.getItem('linkedinProfile');
      if (profile) {
        setLinkedinProfile(JSON.parse(profile));
        setMessages((prev) => [
          ...prev,
          {
            text: "I see you've connected your LinkedIn profile! I can use this information to provide more personalized recommendations.",
            isBot: true,
          },
        ]);
      }
    }
  }, [location]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate responses based on keywords
      const response = await simulateAIResponse(userMessage, linkedinProfile);
      setMessages((prev) => [...prev, response]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm sorry, I encountered an error. Please try again.",
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAIResponse = async (message: string, profile: LinkedInProfile | null): Promise<ChatMessage> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('major') || lowerMessage.includes('study') || lowerMessage.includes('college')) {
      return {
        text: "Based on your interests, here are some recommended majors and minors:",
        isBot: true,
        type: 'majors',
        data: {
          majors: ['Computer Science', 'Data Science', 'Software Engineering'],
          minors: ['Mathematics', 'Business', 'Psychology'],
        },
      };
    }

    if (lowerMessage.includes('course') || lowerMessage.includes('class') || lowerMessage.includes('schedule')) {
      return {
        text: "Here's a recommended 4-year course plan:",
        isBot: true,
        type: 'courses',
        data: [
          { year: 1, courses: ['Introduction to Programming', 'Calculus I', 'Data Structures'] },
          { year: 2, courses: ['Algorithms', 'Database Systems', 'Web Development'] },
          { year: 3, courses: ['Machine Learning', 'Software Engineering', 'Cloud Computing'] },
          { year: 4, courses: ['AI', 'Capstone Project', 'Internship'] },
        ],
      };
    }

    if (lowerMessage.includes('club') || lowerMessage.includes('activity') || lowerMessage.includes('extracurricular')) {
      return {
        text: "Here are some recommended extracurricular activities:",
        isBot: true,
        type: 'extracurriculars',
        data: [
          { type: 'Club', name: 'Coding Club', description: 'Weekly coding challenges and workshops' },
          { type: 'Hackathon', name: 'Tech Innovation', description: 'Annual hackathon for innovative solutions' },
        ],
      };
    }

    if (lowerMessage.includes('alumni') || lowerMessage.includes('connect') || lowerMessage.includes('network')) {
      if (!profile) {
        return {
          text: "To connect with alumni, you'll need to link your LinkedIn profile first. Would you like to do that now?",
          isBot: true,
        };
      }

      return {
        text: "Here are some alumni you might want to connect with:",
        isBot: true,
        type: 'alumni',
        data: [
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            headline: 'Software Engineer at Google',
            profilePicture: 'https://via.placeholder.com/40',
          },
          {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            headline: 'Data Scientist at Microsoft',
            profilePicture: 'https://via.placeholder.com/40',
          },
        ],
      };
    }

    return {
      text: "I understand you're interested in that. Could you tell me more about your specific interests and goals?",
      isBot: true,
    };
  };

  const handleLinkedInConnect = () => {
    linkedinService.initiateAuth();
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Plan Your Future with Confidence
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            AI-powered career planning platform for high school students
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => setShowChat(true)}
            sx={{ mt: 4 }}
          >
            Start Planning
          </Button>
        </Container>
      </Box>

      {/* Chat Section */}
      {showChat && (
        <Container maxWidth="md" sx={{ mb: 6 }}>
          <Paper elevation={3} sx={{ p: 3, height: '500px', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                  <CircularProgress size={20} />
                </Box>
              )}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Tell me about your interests, skills, and dream jobs..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={isLoading}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Paper>
        </Container>
      )}

      {/* Features Section */}
      <Container maxWidth="lg">
        <Stack direction="row" spacing={4} flexWrap="wrap" useFlexGap>
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                flex: '1 1 calc(25% - 24px)',
                minWidth: '250px',
                maxWidth: '100%',
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default LandingPage; 