/**
 * Database Initialization Script
 * Reads and executes database/schema.sql to initialize tables and sample data.
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDatabase() {
  console.log('🔄 Initializing MySQL Database...');

  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    multipleStatements: true
  };

  try {
    const connection = await mysql.createConnection(config);
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');

    console.log('📄 Executing schema.sql statements...');
    await connection.query(schemaSql);
    console.log('✅ MySQL Database and tables created successfully!');
    await connection.end();
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    process.exit(1);
  }
}

initDatabase();
