/**
 * Elderly Pension Disbursement Tracker - Express Server
 * Problem Statement: 126
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middlewares
app.use(cors({
  origin: '*', // Configured for flexible access during development & production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger (Viva friendly, easy to explain)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
const healthRoute = require('./routes/health');
app.use('/api/health', healthRoute);

const path = require('path');

// Serve static frontend files from client/dist if built
const clientDistPath = path.join(__dirname, '../client/dist');
const fs = require('fs');

if (fs.existsSync(clientDistPath)) {
  console.log('📦 Serving production frontend build from client/dist');
  app.use(express.static(clientDistPath));

  // Catch-all route to serve React index.html for client-side routing
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // Base route in development
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to Elderly Pension Disbursement Tracker API (Problem Statement 126)',
      health: '/api/health'
    });
  });
}

// 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start Server and Test DB connection
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Health Check URL: http://localhost:${PORT}/api/health`);
  await db.testConnection();
});

module.exports = app;
