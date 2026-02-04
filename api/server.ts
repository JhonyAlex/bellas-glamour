import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'BellasGlamour API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.get('/api/models', (req, res) => {
  // Mock data for demonstration
  const models = [
    {
      id: '1',
      artistic_name: 'Valentina Rouge',
      age: 24,
      nationality: 'Francesa',
      height_cm: 178,
      measurements: { bust: 90, waist: 62, hips: 92 },
      main_photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '2',
      artistic_name: 'Sofia Noche',
      age: 22,
      nationality: 'Española',
      height_cm: 175,
      measurements: { bust: 88, waist: 60, hips: 90 },
      main_photo: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];
  
  res.json({ models, total: models.length });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;