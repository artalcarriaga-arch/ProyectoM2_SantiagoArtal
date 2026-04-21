const request = require('supertest');
const app = require('../src/index');
const pool = require('../src/db');

describe('Posts API', () => {

  let authorId;

  beforeAll(async () => {
    await pool.query('DELETE FROM posts');
    await pool.query('DELETE FROM authors');

    const authorResult = await pool.query(
      'INSERT INTO authors (name, email) VALUES ($1, $2) RETURNING id',
      ['Test Author', 'test@example.com']
    );
    authorId = authorResult.rows[0].id;
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /posts', () => {
    test('Crear un post válido', async () => {
      const response = await request(app)
        .post('/posts')
        .send({
          author_id: authorId,
          title: 'Mi primer post',
          content: 'Contenido del post',
          published: true
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('Mi primer post');
      expect(response.body.author_id).toBe(authorId);
    });

    test('Rechazar sin author_id', async () => {
      const response = await request(app)
        .post('/posts')
        .send({
          title: 'Post sin autor',
          content: 'Contenido'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    test('Rechazar con author_id inválido', async () => {
      const response = await request(app)
        .post('/posts')
        .send({
          author_id: 99999,
          title: 'Post con autor inválido',
          content: 'Contenido'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('author_id no existe');
    });

    test('Crear post sin publicar (default)', async () => {
      const response = await request(app)
        .post('/posts')
        .send({
          author_id: authorId,
          title: 'Post en borrador',
          content: 'Sin publicar'
        });

      expect(response.status).toBe(201);
      expect(response.body.published).toBe(false);
    });
  });

  describe('GET /posts', () => {
    test('Obtener lista de posts', async () => {
      const response = await request(app).get('/posts');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('Posts incluyen datos del autor', async () => {
      const response = await request(app).get('/posts');

      expect(response.body[0]).toHaveProperty('author_name');
      expect(response.body[0]).toHaveProperty('author_email');
    });
  });

  describe('GET /posts/:id', () => {
    test('Obtener post por ID', async () => {
      const createResponse = await request(app)
        .post('/posts')
        .send({
          author_id: authorId,
          title: 'Post específico',
          content: 'Contenido para buscar'
        });

      const postId = createResponse.body.id;

      const response = await request(app).get(`/posts/${postId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(postId);
      expect(response.body.title).toBe('Post específico');
    });

    test('Retornar 404 para post inexistente', async () => {
      const response = await request(app).get('/posts/99999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Post no encontrado');
    });
  });

  describe('GET /posts/author/:authorId', () => {
    test('Obtener posts de un autor', async () => {
      await request(app)
        .post('/posts')
        .send({
          author_id: authorId,
          title: 'Post 1',
          content: 'Contenido 1'
        });

      await request(app)
        .post('/posts')
        .send({
          author_id: authorId,
          title: 'Post 2',
          content: 'Contenido 2'
        });

      const response = await request(app).get(`/posts/author/${authorId}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].author_id).toBe(authorId);
    });

    test('Retornar 404 si autor no tiene posts', async () => {
      const newAuthorResult = await pool.query(
        'INSERT INTO authors (name, email) VALUES ($1, $2) RETURNING id',
        ['Nuevo Autor', 'nuevo@example.com']
      );
      const newAuthorId = newAuthorResult.rows[0].id;

      const response = await request(app).get(`/posts/author/${newAuthorId}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /posts/:id', () => {
    test('Actualizar post', async () => {
      const createResponse = await request(app)
        .post('/posts')
        .send({
          author_id: authorId,
          title: 'Original Title',
          content: 'Original Content'
        });

      const postId = createResponse.body.id;

      const response = await request(app)
        .put(`/posts/${postId}`)
        .send({
          title: 'Updated Title',
          content: 'Updated Content',
          published: true
        });

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Updated Title');
      expect(response.body.published).toBe(true);
    });

    test('Retornar 404 al actualizar post inexistente', async () => {
      const response = await request(app)
        .put('/posts/99999')
        .send({
          title: 'Test',
          content: 'Test'
        });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /posts/:id', () => {
    test('Eliminar post', async () => {
      const createResponse = await request(app)
        .post('/posts')
        .send({
          author_id: authorId,
          title: 'To Delete',
          content: 'This will be deleted'
        });

      const postId = createResponse.body.id;

      const response = await request(app).delete(`/posts/${postId}`);

      expect(response.status).toBe(204);

      const getResponse = await request(app).get(`/posts/${postId}`);
      expect(getResponse.status).toBe(404);
    });

    test('Retornar 404 al eliminar post inexistente', async () => {
      const response = await request(app).delete('/posts/99999');

      expect(response.status).toBe(404);
    });
  });

  describe('Cascading delete', () => {
    test('Eliminar autor elimina sus posts', async () => {
      const authorResult = await pool.query(
        'INSERT INTO authors (name, email) VALUES ($1, $2) RETURNING id',
        ['Author to Delete', 'autodelete@example.com']
      );
      const tempAuthorId = authorResult.rows[0].id;

      const postResult = await pool.query(
        'INSERT INTO posts (author_id, title, content) VALUES ($1, $2, $3) RETURNING id',
        [tempAuthorId, 'Post to cascade delete', 'Content']
      );
      const postId = postResult.rows[0].id;

      await request(app).delete(`/authors/${tempAuthorId}`);

      const postResponse = await request(app).get(`/posts/${postId}`);
      expect(postResponse.status).toBe(404);
    });
  });

});
