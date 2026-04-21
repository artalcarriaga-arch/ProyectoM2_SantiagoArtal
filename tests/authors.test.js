const request = require('supertest');
const app = require('../src/index');
const pool = require('../src/db');

describe('Authors API', () => {

  beforeAll(async () => {
    await pool.query('DELETE FROM posts');
    await pool.query('DELETE FROM authors');
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /authors', () => {
    test('Crear un autor válido', async () => {
      const response = await request(app)
        .post('/authors')
        .send({
          name: 'Juan García',
          email: 'juan@example.com',
          bio: 'Desarrollador backend'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Juan García');
      expect(response.body.email).toBe('juan@example.com');
    });

    test('Rechazar sin name', async () => {
      const response = await request(app)
        .post('/authors')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    test('Rechazar email duplicado', async () => {
      await request(app)
        .post('/authors')
        .send({
          name: 'María López',
          email: 'maria@example.com'
        });

      const response = await request(app)
        .post('/authors')
        .send({
          name: 'Otro Nombre',
          email: 'maria@example.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email ya existe');
    });
  });

  describe('GET /authors', () => {
    test('Obtener lista de autores', async () => {
      const response = await request(app).get('/authors');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /authors/:id', () => {
    test('Obtener autor por ID', async () => {
      const createResponse = await request(app)
        .post('/authors')
        .send({
          name: 'Carlos Rodríguez',
          email: 'carlos@example.com'
        });

      const authorId = createResponse.body.id;

      const response = await request(app).get(`/authors/${authorId}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(authorId);
      expect(response.body.name).toBe('Carlos Rodríguez');
    });

    test('Retornar 404 para autor inexistente', async () => {
      const response = await request(app).get('/authors/99999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Autor no encontrado');
    });
  });

  describe('PUT /authors/:id', () => {
    test('Actualizar autor', async () => {
      const createResponse = await request(app)
        .post('/authors')
        .send({
          name: 'Original Name',
          email: 'original@example.com'
        });

      const authorId = createResponse.body.id;

      const response = await request(app)
        .put(`/authors/${authorId}`)
        .send({
          name: 'Updated Name',
          email: 'updated@example.com',
          bio: 'Nueva biografía'
        });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Updated Name');
      expect(response.body.email).toBe('updated@example.com');
    });

    test('Retornar 404 al actualizar autor inexistente', async () => {
      const response = await request(app)
        .put('/authors/99999')
        .send({
          name: 'Test',
          email: 'test@example.com'
        });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /authors/:id', () => {
    test('Eliminar autor', async () => {
      const createResponse = await request(app)
        .post('/authors')
        .send({
          name: 'To Delete',
          email: 'todelete@example.com'
        });

      const authorId = createResponse.body.id;

      const response = await request(app).delete(`/authors/${authorId}`);

      expect(response.status).toBe(204);

      const getResponse = await request(app).get(`/authors/${authorId}`);
      expect(getResponse.status).toBe(404);
    });

    test('Retornar 404 al eliminar autor inexistente', async () => {
      const response = await request(app).delete('/authors/99999');

      expect(response.status).toBe(404);
    });
  });

});
