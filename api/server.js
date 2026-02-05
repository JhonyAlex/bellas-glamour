const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: ['https://www.bellasglamour.com', 'http://localhost:5173', 'https://bellasglamour.vercel.app'],
  credentials: true
}));

// Security headers
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Force correct MIME types - THIS IS THE CRITICAL FIX
app.use((req, res, next) => {
  const ext = path.extname(req.url).toLowerCase();
  
  switch (ext) {
    case '.js':
      res.type('application/javascript');
      break;
    case '.mjs':
      res.type('application/javascript');
      break;
    case '.ts':
      res.type('application/javascript');
      break;
    case '.css':
      res.type('text/css');
      break;
    case '.svg':
      res.type('image/svg+xml');
      break;
    case '.png':
      res.type('image/png');
      break;
    case '.jpg':
    case '.jpeg':
      res.type('image/jpeg');
      break;
    case '.webp':
      res.type('image/webp');
      break;
    case '.woff':
      res.type('font/woff');
      break;
    case '.woff2':
      res.type('font/woff2');
      break;
    case '.json':
      res.type('application/json');
      break;
  }
  
  next();
});

// Log requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - MIME: ${res.getHeader('Content-Type') || 'auto'}`);
  next();
});

// Serve static files from dist with explicit MIME types
const distPath = path.join(__dirname, '../dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      
      // Double-check MIME types for static files
      if (ext === '.js' || ext === '.mjs' || ext === '.ts') {
        res.setHeader('Content-Type', 'application/javascript');
        console.log(`🎯 Forcing JS MIME for: ${filePath}`);
      } else if (ext === '.css') {
        res.setHeader('Content-Type', 'text/css');
      } else if (ext === '.svg') {
        res.setHeader('Content-Type', 'image/svg+xml');
      }
      
      // Add cache headers for static assets
      if (ext === '.js' || ext === '.css' || ext === '.png' || ext === '.jpg' || ext === '.svg') {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }));
  
  console.log('📁 Serving static files from:', distPath);
} else {
  console.log('⚠️  Dist directory not found:', distPath);
}

// API routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mimeFix: 'ACTIVE',
    server: 'Express with forced MIME types'
  });
});

// Models API endpoint
app.get('/api/models', async (req, res) => {
  try {
    // Mock data for testing
    const models = [
      {
        id: 1,
        name: 'Ana García',
        category: 'fashion',
        location: 'Madrid, Spain',
        experience: '5 años',
        height: '175cm',
        image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&h=600&fit=crop&crop=face'
      },
      {
        id: 2,
        name: 'Lucía Martínez',
        category: 'commercial',
        location: 'Barcelona, Spain',
        experience: '3 años',
        height: '170cm',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face'
      }
    ];
    
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SPA fallback - THIS MUST BE LAST
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html');
  
  if (fs.existsSync(indexPath)) {
    console.log('📄 Serving SPA index.html for:', req.url);
    res.sendFile(indexPath);
  } else {
    console.log('❌ index.html not found at:', indexPath);
    res.status(404).json({ 
      error: 'index.html not found',
      path: indexPath,
      url: req.url 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔧 MIME type fix: ACTIVE`);
  console.log(`📁 Static files: ${path.join(__dirname, '../dist')}`);
  console.log(`🌐 CORS enabled for: www.bellasglamour.com`);
});

module.exports = app;