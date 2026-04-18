const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'miniblog',
});

async function setupDatabase() {
  try {
    console.log('Iniciando setup de base de datos...');
    
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    console.log('Creando tablas desde schema.sql...');
    await pool.query(schema);
    console.log('Tablas creadas exitosamente');
    
    await pool.end();
    console.log('Setup completado!');
    process.exit(0);
    
  } catch (error) {
    console.error('Error durante setup:', error.message);
    console.error(error);
    await pool.end();
    process.exit(1);
  }
}

setupDatabase();
