const authorsService = require('../services/authorsService');

const authorsController = {

  async getAll(req, res, next) {
    try {
      const authors = await authorsService.getAll();
      res.status(200).json(authors);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const author = await authorsService.getById(id);
      
      if (!author) {
        const err = new Error('Autor no encontrado');
        err.status = 404;
        return next(err);
      }
      
      res.status(200).json(author);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const { name, email, bio } = req.body;
      const author = await authorsService.create(name, email, bio);
      res.status(201).json(author);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, bio } = req.body;
      
      const author = await authorsService.update(id, name, email, bio);
      
      if (!author) {
        const err = new Error('Autor no encontrado');
        err.status = 404;
        return next(err);
      }
      
      res.status(200).json(author);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const author = await authorsService.delete(id);
      
      if (!author) {
        const err = new Error('Autor no encontrado');
        err.status = 404;
        return next(err);
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

};

module.exports = authorsController;
