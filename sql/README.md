# Esquema SQL - MiniBlog API

## 📊 Estructura de datos

Nuestro MiniBlog necesita gestionar **autores** y **posts**. Te explico cada parte:

### 🧑 Tabla: `authors`

```sql
id SERIAL PRIMARY KEY
```
- **SERIAL**: Número que se auto-incrementa (1, 2, 3...)
- **PRIMARY KEY**: Identificador único de cada autor

```sql
name VARCHAR(255) NOT NULL
```
- **VARCHAR(255)**: Texto hasta 255 caracteres
- **NOT NULL**: Es obligatorio, no puede estar vacío

```sql
email VARCHAR(255) NOT NULL UNIQUE
```
- **UNIQUE**: No pueden existir dos autores con el mismo email
- Esto garantiza integridad de datos

```sql
bio TEXT
```
- **TEXT**: Texto largo (sin límite de caracteres)
- Sin **NOT NULL** = es opcional

```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```
- Automáticamente registra cuándo se creó/actualizó el registro
- **DEFAULT CURRENT_TIMESTAMP**: Rellena automáticamente con la fecha/hora actual

### 📝 Tabla: `posts`

```sql
author_id INTEGER NOT NULL
FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
```
- **FOREIGN KEY**: Clave foránea - vincula este post con un author
- **REFERENCES authors(id)**: Apunta al id de la tabla authors
- **ON DELETE CASCADE**: Si borras un author, sus posts se borran automáticamente

### 🔍 Índices

```sql
CREATE INDEX idx_authors_email ON authors(email);
CREATE INDEX idx_posts_author_id ON posts(author_id);
```

Los índices son como "atajos" en un libro:
- Sin índice: PostgreSQL lee todos los registros (lento)
- Con índice: PostgreSQL va directo al registro (rápido)

Creamos índices en:
- `authors.email` → para búsquedas por email
- `posts.author_id` → para encontrar posts de un autor
- `posts.published` → para filtrar posts publicados/no publicados
- `posts.created_at` → para ordenar por fecha

---

## 🚀 Cómo usar estos scripts

### Opción 1: Usar `psql` (cliente de PostgreSQL)

```bash
# Crear base de datos
psql -U postgres -c "CREATE DATABASE miniblog;"

# Ejecutar schema
psql -U postgres -d miniblog -f sql/schema.sql

# Ejecutar seed (datos de prueba)
psql -U postgres -d miniblog -f sql/seed.sql
```

### Opción 2: Desde Node.js (lo haremos después)

Crearemos un script `sql/setup.js` que:
1. Conecta a PostgreSQL
2. Ejecuta `schema.sql`
3. Ejecuta `seed.sql` (opcional)
4. Desconecta

---

## 📋 Resumen de relaciones

```
authors (1) ──── (N) posts
│                     │
├─ id (PK)           ├─ id (PK)
├─ name              ├─ author_id (FK) → authors.id
├─ email (UNIQUE)    ├─ title
├─ bio               ├─ content
├─ created_at        ├─ published
└─ updated_at        ├─ created_at
                     └─ updated_at
```

**Un autor puede tener muchos posts, pero cada post pertenece a un solo autor.**

---

## ✅ Validaciones en BD

- **Email único**: No pueden haber 2 autores con el mismo email
- **No nulos**: name, email, title, content, author_id no pueden estar vacíos
- **Integridad referencial**: No puedes crear un post con un author_id que no existe
- **Borrado en cascada**: Si borras un author, sus posts se borran automáticamente

---

Ahora que tenemos el schema claro, en la próxima fase crearemos:
1. Script `sql/setup.js` para crear la BD desde Node.js
2. Conexión en `src/db.js`
3. Rutas y servicios para CRUD

¡Vamos bien! 🚀
