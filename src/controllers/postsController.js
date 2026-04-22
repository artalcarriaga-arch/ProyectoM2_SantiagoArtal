const postsService = require('../services/postsService');

const postsController = {

  async getAll(req, res, next) {
    try {
      const posts = await postsService.getAll();
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postsService.getById(id);
      
      if (!post) {
        const err = new Error('Post no encontrado');
        err.status = 404;
        return next(err);
      }
      
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },

  async getByAuthorId(req, res, next) {
    try {
      const { authorId } = req.params;
      const posts = await postsService.getByAuthorId(authorId);
      
      if (posts.length === 0) {
        const err = new Error('No hay posts de este autor');
        err.status = 404;
        return next(err);
      }
      
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { author_id, title, content, published } = req.body;
      const post = await postsService.create(author_id, title, content, published || false);
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, published } = req.body;
      
      const post = await postsService.update(id, title, content, published);
      
      if (!post) {
        const err = new Error('Post no encontrado');
        err.status = 404;
        return next(err);
      }
      
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const post = await postsService.delete(id);
      
      if (!post) {
        const err = new Error('Post no encontrado');
        err.status = 404;
        return next(err);
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

};

module.exports = postsController;
