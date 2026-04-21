const pool = require('../db');

const authorsService = {
  
  async getAll() {
    const result = await pool.query('SELECT * FROM authors ORDER BY id DESC');
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return result.rows[0];
  },

  async create(name, email, bio) {
    const result = await pool.query(
      'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bio]
    );
    return result.rows[0];
  },

  async update(id, name, email, bio) {
    const result = await pool.query(
      'UPDATE authors SET name = $1, email = $2, bio = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [name, email, bio, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

};

module.exports = authorsService;
