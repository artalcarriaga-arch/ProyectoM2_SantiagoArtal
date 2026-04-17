-- Datos de prueba para desarrollar/testear la API
-- Descomenta las líneas abajo para limpiar datos existentes:
-- DELETE FROM posts;
-- DELETE FROM authors;
-- ALTER SEQUENCE authors_id_seq RESTART WITH 1;
-- ALTER SEQUENCE posts_id_seq RESTART WITH 1;

-- Insertar autores de ejemplo
INSERT INTO authors (name, email, bio) VALUES
  ('Juan García', 'juan@example.com', 'Desarrollador backend apasionado por Node.js'),
  ('María López', 'maria@example.com', 'Especialista en bases de datos y SQL'),
  ('Carlos Rodríguez', 'carlos@example.com', 'Full-stack developer y tech writer');

-- Insertar posts de ejemplo
INSERT INTO posts (author_id, title, content, published) VALUES
  (1, 'Introducción a Express.js', 'Express es un framework minimalista para Node.js que permite crear APIs REST de forma sencilla...', true),
  (1, 'Conexión a PostgreSQL con node-pg', 'La librería pg de Node.js permite conectar con PostgreSQL de forma simple y segura...', true),
  (1, 'Testing en Node.js', 'Jest y Supertest son herramientas poderosas para escribir tests en aplicaciones Node.js...', false),
  (2, 'Diseño de bases de datos relacionales', 'Una buena estructura de BD es crucial para la escalabilidad y mantenimiento...', true),
  (2, 'Índices en PostgreSQL', 'Los índices permiten acelerar las búsquedas en tablas grandes de forma significativa...', true),
  (3, 'Full-stack en 2024', 'Las mejores prácticas para desarrolladores que trabajan en frontend y backend...', true);
