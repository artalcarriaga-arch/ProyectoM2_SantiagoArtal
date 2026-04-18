const pool = require('./src/db');

async function testConnection() {
  try {
    console.log('Probando conexión a PostgreSQL...');
    
    const result = await pool.query('SELECT NOW()');
    console.log('Conexión exitosa');
    console.log('Hora del servidor:', result.rows[0].now);
    
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const tables = tablesResult.rows.map(r => r.table_name);
    console.log('\nTablas en la BD:');
    if (tables.length === 0) {
      console.log('No hay tablas. Ejecuta: npm run db:setup');
    } else {
      tables.forEach(t => console.log(`  - ${t}`));
    }
    
    if (tables.includes('authors')) {
      const authorsCount = await pool.query('SELECT COUNT(*) FROM authors');
      console.log(`\nAutores: ${authorsCount.rows[0].count}`);
    }
    
    if (tables.includes('posts')) {
      const postsCount = await pool.query('SELECT COUNT(*) FROM posts');
      console.log(`Posts: ${postsCount.rows[0].count}`);
    }
    
    console.log('\nTest completado exitosamente!');
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('PostgreSQL no está corriendo.');
    } else if (error.code === '28P01') {
      console.error('Contraseña incorrecta en .env');
    } else if (error.code === '3D000') {
      console.error('Base de datos no existe.');
    }
  } finally {
    await pool.end();
  }
}

testConnection();
