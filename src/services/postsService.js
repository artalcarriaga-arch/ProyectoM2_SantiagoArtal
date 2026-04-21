const pool = require('../db');

const postsService = {

  async getAll() {
    const result = await pool.query(`
      SELECT p.*, a.name as author_name, a.email as author_email
      FROM posts p
      JOIN authors a ON p.author_id = a.id
      ORDER BY p.created_at DESC
    `);
    return result.rows;
  },

  async getById(id) {
    const result = await pool.query(`
      SELECT p.*, a.name as author_name, a.email as author_email
      FROM posts p
      JOIN authors a ON p.author_id = a.id
      WHERE p.id = $1
    `, [id]);
    return result.rows[0];
  },

  async getByAuthorId(authorId) {
    const result = await pool.query(`
      SELECT p.*, a.name as author_name, a.email as author_email
      FROM posts p
      JOIN authors a ON p.author_id = a.id
      WHERE p.author_id = $1
      ORDER BY p.created_at DESC
    `, [authorId]);
    return result.rows;
  },

  async create(authorId, title, content, published) {
    const result = await pool.query(
      'INSERT INTO posts (author_id, title, content, published) VALUES ($1, $2, $3, $4) RETURNING *',
      [authorId, title, content, published]
    );
    return result.rows[0];
  },

  async update(id, title, content, published) {
    const result = await pool.query(
      'UPDATE posts SET title = $1, content = $2, published = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
      [title, content, published, id]
    );
    return result.rows[0];
  },

  async delete(id) {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

};

module.exports = postsService;
