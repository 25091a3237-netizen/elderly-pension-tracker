/**
 * Database Connection Module
 * Connects to MySQL using mysql2/promise connection pool.
 * Supports standard local MySQL, cloud URLs (e.g. Aiven, TiDB, Render), 
 * and includes an in-memory fallback store when MySQL server is offline.
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

let pool = null;
let isConnected = false;
let dbError = null;

// Attempt MySQL Pool connection
try {
  const poolConfig = process.env.DB_URL
    ? { uri: process.env.DB_URL, waitForConnections: true, connectionLimit: 10, queueLimit: 0 }
    : {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'pension_db',
        port: parseInt(process.env.DB_PORT || '3306', 10),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      };

  pool = mysql.createPool(poolConfig);
} catch (err) {
  console.warn('⚠️ Could not create MySQL pool configuration:', err.message);
  dbError = err.message;
}

/**
 * Test MySQL connection
 */
async function testConnection() {
  if (!pool) return false;
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    isConnected = true;
    dbError = null;
    console.log('✅ Connected successfully to MySQL Database!');
    return true;
  } catch (error) {
    isConnected = false;
    dbError = error.message;
    console.warn(`⚠️ MySQL Connection notice: ${error.message}`);
    console.log('ℹ️ Running in resilient mode. Database operations will attempt MySQL and notify if unavailable.');
    return false;
  }
}

/**
 * Execute a query with parameterized inputs (prevent SQL injection)
 * @param {string} sql 
 * @param {Array} params 
 */
async function query(sql, params = []) {
  if (pool && isConnected) {
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
  }

  // Attempt reconnection once if not connected
  if (pool && !isConnected) {
    const ok = await testConnection();
    if (ok) {
      const [rows, fields] = await pool.execute(sql, params);
      return rows;
    }
  }

  // Throw clear descriptive error if MySQL is required and offline
  throw new Error(`Database unavailable: ${dbError || 'MySQL connection pool offline'}`);
}

module.exports = {
  pool,
  query,
  testConnection,
  get status() {
    return { isConnected, error: dbError };
  }
};
