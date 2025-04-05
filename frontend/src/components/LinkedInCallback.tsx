import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import { linkedinService } from '../services/linkedinService';

const LinkedInCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const error = params.get('error');

        if (error) {
          setError('LinkedIn authentication failed. Please try again.');
          return;
        }

        if (!code) {
          setError('No authorization code received. Please try again.');
          return;
        }

        const response = await linkedinService.handleCallback(code);
        localStorage.setItem('linkedinToken', response.access_token);
        localStorage.setItem('linkedinProfile', JSON.stringify(response.profile));
        
        // Redirect back to the chat with the LinkedIn data
        navigate('/?source=linkedin');
      } catch (err) {
        setError('An error occurred during LinkedIn authentication. Please try again.');
        console.error('LinkedIn callback error:', err);
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      {error ? (
        <Alert severity="error" sx={{ maxWidth: 600, width: '100%' }}>
          {error}
        </Alert>
      ) : (
        <>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h6" align="center">
            Connecting to LinkedIn...
          </Typography>
        </>
      )}
    </Box>
  );
};

export default LinkedInCallback; 