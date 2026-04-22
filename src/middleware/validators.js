const validateAuthorInput = (req, res, next) => {
  const { name, email, bio } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ 
      error: 'El campo name es obligatorio' 
    });
  }
  
  if (!email || email.trim() === '') {
    return res.status(400).json({ 
      error: 'El campo email es obligatorio' 
    });
  }
  
  if (email && !email.includes('@')) {
    return res.status(400).json({ 
      error: 'El email debe ser válido' 
    });
  }
  
  next();
};

const validatePostInput = (req, res, next) => {
  const { author_id, title, content, published } = req.body;
  
  if (!author_id) {
    return res.status(400).json({ 
      error: 'El campo author_id es obligatorio' 
    });
  }
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ 
      error: 'El campo title es obligatorio' 
    });
  }
  
  if (!content || content.trim() === '') {
    return res.status(400).json({ 
      error: 'El campo content es obligatorio' 
    });
  }
  
  next();
};

const validatePostUpdateInput = (req, res, next) => {
  const { title, content } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ 
      error: 'El campo title es obligatorio' 
    });
  }
  
  if (!content || content.trim() === '') {
    return res.status(400).json({ 
      error: 'El campo content es obligatorio' 
    });
  }
  
  next();
};

module.exports = {
  validateAuthorInput,
  validatePostInput,
  validatePostUpdateInput
};
