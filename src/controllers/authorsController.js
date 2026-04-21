const authorsService = require('../services/authorsService');

const authorsController = {

  async getAll(req, res) {
    try {
      const authors = await authorsService.getAll();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener autores' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const author = await authorsService.getById(id);
      
      if (!author) {
        return res.status(404).json({ error: 'Autor no encontrado' });
      }
      
      res.status(200).json(author);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener autor' });
    }
  },

  async create(req, res) {
    try {
      const { name, email, bio } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: 'name y email son requeridos' });
      }
      
      const author = await authorsService.create(name, email, bio);
      res.status(201).json(author);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Email ya existe' });
      }
      res.status(500).json({ error: 'Error al crear autor' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, bio } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: 'name y email son requeridos' });
      }
      
      const author = await authorsService.update(id, name, email, bio);
      
      if (!author) {
        return res.status(404).json({ error: 'Autor no encontrado' });
      }
      
      res.status(200).json(author);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Email ya existe' });
      }
      res.status(500).json({ error: 'Error al actualizar autor' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const author = await authorsService.delete(id);
      
      if (!author) {
        return res.status(404).json({ error: 'Autor no encontrado' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar autor' });
    }
  }

};

module.exports = authorsController;
