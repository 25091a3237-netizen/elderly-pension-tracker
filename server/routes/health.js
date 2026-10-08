const express = require('express');
const router = express.Router();
const db = require('../config/db');

/**
 * GET /api/health
 * Health check endpoint for verifying server and database connectivity
 */
router.get('/', async (req, res) => {
  const dbConnected = await db.testConnection().catch(() => false);

  res.json({
    status: 'ok',
    service: 'Elderly Pension Disbursement Tracker API',
    problemStatement: 126,
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: {
      connected: dbConnected,
      engine: 'MySQL',
      message: dbConnected ? 'MySQL connection pool active' : 'MySQL server offline or waiting for credentials'
    }
  });
});

module.exports = router;
