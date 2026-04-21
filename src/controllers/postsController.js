const postsService = require('../services/postsService');

const postsController = {

  async getAll(req, res) {
    try {
      const posts = await postsService.getAll();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener posts' });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const post = await postsService.getById(id);
      
      if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' });
      }
      
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener post' });
    }
  },

  async getByAuthorId(req, res) {
    try {
      const { authorId } = req.params;
      const posts = await postsService.getByAuthorId(authorId);
      
      if (posts.length === 0) {
        return res.status(404).json({ error: 'No hay posts de este autor' });
      }
      
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener posts del autor' });
    }
  },

  async create(req, res) {
    try {
      const { author_id, title, content, published } = req.body;
      
      if (!author_id || !title || !content) {
        return res.status(400).json({ error: 'author_id, title y content son requeridos' });
      }
      
      const post = await postsService.create(author_id, title, content, published || false);
      res.status(201).json(post);
    } catch (error) {
      if (error.code === '23503') {
        return res.status(400).json({ error: 'author_id no existe' });
      }
      res.status(500).json({ error: 'Error al crear post' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, content, published } = req.body;
      
      if (!title || !content) {
        return res.status(400).json({ error: 'title y content son requeridos' });
      }
      
      const post = await postsService.update(id, title, content, published);
      
      if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' });
      }
      
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar post' });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const post = await postsService.delete(id);
      
      if (!post) {
        return res.status(404).json({ error: 'Post no encontrado' });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar post' });
    }
  }

};

module.exports = postsController;
