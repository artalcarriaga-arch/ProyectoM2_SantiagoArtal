const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  // PostgreSQL errors
  if (err.code === '23505') {
    // UNIQUE constraint violation
    return res.status(400).json({ 
      error: 'El email ya existe' 
    });
  }
  
  if (err.code === '23503') {
    // FOREIGN KEY constraint violation
    return res.status(400).json({ 
      error: 'Referencia inválida (posiblemente author_id no existe)' 
    });
  }
  
  if (err.code === '23502') {
    // NOT NULL constraint violation
    return res.status(400).json({ 
      error: 'Campos requeridos faltantes' 
    });
  }
  
  // Validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: err.message 
    });
  }
  
  // Database connection errors
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({ 
      error: 'Servicio de base de datos no disponible' 
    });
  }
  
  // Default error
  return res.status(err.status || 500).json({ 
    error: err.message || 'Error interno del servidor' 
  });
};

module.exports = errorHandler;
