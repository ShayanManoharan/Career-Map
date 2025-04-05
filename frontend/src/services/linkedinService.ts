import axios from 'axios';

const LINKEDIN_API_URL = 'https://api.linkedin.com/v2';
const LINKEDIN_CLIENT_ID = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/linkedin-callback`;

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  profilePicture: string;
  currentPosition: string;
  education: Array<{
    school: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
  }>;
  skills: string[];
}

export const linkedinService = {
  initiateAuth: () => {
    const scope = 'r_liteprofile r_emailaddress w_member_social';
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}`;
    window.location.href = authUrl;
  },

  handleCallback: async (code: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/linkedin/auth', { code });
      return response.data;
    } catch (error) {
      console.error('LinkedIn authentication error:', error);
      throw error;
    }
  },

  getProfile: async (accessToken: string): Promise<LinkedInProfile> => {
    try {
      const response = await axios.get(`${LINKEDIN_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching LinkedIn profile:', error);
      throw error;
    }
  },

  findAlumni: async (school: string, major: string) => {
    try {
      const response = await axios.get(`${LINKEDIN_API_URL}/people-search`, {
        params: {
          school,
          major,
          connectionDegree: '2',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching for alumni:', error);
      throw error;
    }
  },

  connectWithAlumni: async (alumniId: string, message: string) => {
    try {
      const response = await axios.post(`${LINKEDIN_API_URL}/connections`, {
        alumniId,
        message,
      });
      return response.data;
    } catch (error) {
      console.error('Error connecting with alumni:', error);
      throw error;
    }
  },
}; 