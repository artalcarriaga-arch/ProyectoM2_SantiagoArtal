const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'miniblog',
  // Para Railway usar DATABASE_URL
  ...(process.env.DATABASE_URL && { connectionString: process.env.DATABASE_URL }),
});

pool.on('error', (err) => {
  console.error('Error en pool de conexión:', err);
});

module.exports = pool;
