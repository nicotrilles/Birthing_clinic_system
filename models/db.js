const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Nicotrilles123456789!',
  database: 'birthing_clinic',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get a Promise-based interface for the pool
const db = pool.promise();

console.log('MySQL pool created');

module.exports = db;
