# Future Map - AI-Powered Career Planning Platform

Future Map is a comprehensive web application designed to help high school students plan their academic and professional futures. Using AI-powered recommendations, the platform provides personalized guidance for college majors, course planning, extracurricular activities, and career development.

## Features

- **Personalized College Recommendations**: Get AI-generated suggestions for college majors and minors based on your interests and goals
- **4-Year Course Planning**: Receive a customized high school course plan aligned with your career aspirations
- **Extracurricular Guidance**: Discover relevant clubs, competitions, and volunteer opportunities
- **Summer Program Recommendations**: Find internships and summer programs that match your interests
- **Certification Planning**: Get suggestions for industry-specific certifications and online courses
- **LinkedIn Integration**: Connect with current students and alumni in your field of interest

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for components
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- MongoDB for database
- OpenAI API for AI recommendations
- LinkedIn API for networking

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- OpenAI API key
- LinkedIn API credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/future-map.git
cd future-map
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/future-map
OPENAI_API_KEY=your_openai_api_key_here
LINKEDIN_CLIENT_ID=your_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here
```

5. Start the development servers:

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
future-map/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── theme.ts
│   │   └── App.tsx
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the AI capabilities
- LinkedIn for the professional networking integration
- Material-UI for the beautiful component library 