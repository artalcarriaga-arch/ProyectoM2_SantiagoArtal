-- ============================================
-- MINIBLOG API - Schema SQL
-- ============================================
-- Tablas para gestionar usuarios (authors) y posts (publicaciones)
-- BD: miniblog
-- Motor: PostgreSQL

-- ============================================
-- TABLA: authors (Usuarios/Autores)
-- ============================================
-- Almacena información de los usuarios que pueden escribir posts
CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,                    -- Identificador único (auto-incrementado)
  name VARCHAR(255) NOT NULL,               -- Nombre del autor (obligatorio)
  email VARCHAR(255) NOT NULL UNIQUE,       -- Email único (no puede haber 2 iguales)
  bio TEXT,                                 -- Biografía (opcional)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación automática
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Fecha de última actualización
);

-- Índice en email para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_authors_email ON authors(email);

-- ============================================
-- TABLA: posts (Publicaciones)
-- ============================================
-- Almacena publicaciones/artículos creados por autores
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,                    -- Identificador único (auto-incrementado)
  author_id INTEGER NOT NULL,               -- FK: quién escribió el post
  title VARCHAR(255) NOT NULL,              -- Título del post (obligatorio)
  content TEXT NOT NULL,                    -- Contenido del post (obligatorio)
  published BOOLEAN DEFAULT false,          -- ¿Está publicado? (por defecto no)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación automática
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de última actualización
  CONSTRAINT fk_posts_author_id 
    FOREIGN KEY (author_id) 
    REFERENCES authors(id) 
    ON DELETE CASCADE                       -- Si borras un author, borra sus posts
);

-- Índice en author_id para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
-- Índice en published para filtrar posts publicados
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
-- Índice en created_at para ordenar por fecha
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
