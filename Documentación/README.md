# MiniBlog API

API REST para gestión de usuarios (authors) y publicaciones (posts) en una plataforma de contenidos.

## 📋 Descripción

MiniBlog es una API sencilla pero robusta construida con Node.js/Express y PostgreSQL. Permite crear, leer, actualizar y eliminar usuarios y posts, con validaciones, tests unitarios y documentación OpenAPI.

### Características
- ✅ CRUD completo para usuarios y posts
- ✅ Relaciones entre tablas (FKs)
- ✅ Validaciones en las entradas
- ✅ Tests unitarios con Jest y Supertest
- ✅ Documentación OpenAPI/Swagger
- ✅ Preparado para deploy en Railway

## 🚀 Inicio rápido

### Requisitos previos
- Node.js 14+
- PostgreSQL 12+
- npm o yarn

### Instalación local

1. **Clonar el repositorio**
```bash
git clone <repo-url>
cd miniblog-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Edita .env con tus credenciales PostgreSQL
```

4. **Crear base de datos y tablas**
```bash
npm run db:setup
```

5. **Verificar conexión (opcional)**
```bash
node test-db.js
```

6. **Ejecutar la aplicación**
```bash
npm run dev    # Desarrollo con nodemon
# o
npm start      # Producción
```

La API estará disponible en `http://localhost:3000`

## 📚 API Endpoints

### Authors (Usuarios)
- `GET /authors` - Listar todos
- `GET /authors/:id` - Detalle de un usuario
- `POST /authors` - Crear usuario
- `PUT /authors/:id` - Actualizar usuario
- `DELETE /authors/:id` - Eliminar usuario

### Posts (Publicaciones)
- `GET /posts` - Listar todos
- `GET /posts/:id` - Detalle de un post
- `GET /posts/author/:authorId` - Posts de un autor
- `POST /posts` - Crear post
- `PUT /posts/:id` - Actualizar post
- `DELETE /posts/:id` - Eliminar post

## 🧪 Tests

```bash
npm test              # Ejecutar tests
npm run test:watch    # Modo watch (re-ejecuta al cambiar archivos)
npm run test:coverage # Ver cobertura
```

### Cobertura de Tests

El proyecto incluye **25+ casos de prueba** que cubren:

- **Authors:** Crear, obtener, actualizar, eliminar usuarios
  - Validación: name y email requeridos, email único
  - Códigos HTTP: 200, 201, 400, 404
  
- **Posts:** CRUD completo de publicaciones
  - Validación: author_id, title y content requeridos
  - Foreign Key: Rechaza posts con author_id inexistente
  - Cascading delete: Borrar author borra sus posts automáticamente
  - Relaciones: Posts incluyen datos del author (name, email)

- **Aislamiento:** Cada test limpia la BD antes de ejecutarse

Usa **Jest** como framework y **Supertest** para simular requests HTTP.

## 📖 Documentación OpenAPI

El archivo `openapi.yaml` contiene la **especificación completa de la API** en formato OpenAPI 3.0.

### Cómo visualizarla

**Opción 1: Swagger Editor Online (sin instalar nada)**
- Ir a https://editor.swagger.io
- Menu → File → Import file
- Selecciona `openapi.yaml` de este proyecto
- ¡Listo! Tendrás documentación interactiva

**Opción 2: Localmente con Swagger UI**

Si quieres servir la documentación desde tu app:

```bash
npm install swagger-ui-express yamljs
```

Luego en `src/index.js`, agregar antes de `app.listen()`:

```javascript
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./openapi.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
```

Accede a: `http://localhost:3000/api-docs`

### Estructura del spec

- **Paths:** Todos los 11 endpoints (6 authors + 6 posts + 1 health)
- **Schemas:** Modelos de datos (Author, Post, PostWithAuthor, etc.)
- **Responses:** HTTP codes documentados (200, 201, 204, 400, 404, 500)
- **Parameters:** IDs, query params, request bodies

## 🚢 Deployment en Railway

La aplicación está **lista para desplegar en Railway**, una plataforma moderna de hosting que automatiza todo el proceso.

### Qué es Railway

Railway aloja tu app Node.js + PostgreSQL en la nube. En lugar de configurar servidores, simplemente:
1. Conectas tu GitHub
2. Configuras variables de entorno
3. Railway detecta cambios y redeploya automáticamente

### Pasos para desplegar

**1. Crear cuenta en Railway**
- Ir a https://railway.app
- Sign up with GitHub

**2. Crear proyecto**
- Click "Create Project"
- "Deploy from GitHub repo"
- Selecciona tu repositorio

**3. Agregar PostgreSQL**
- Click "+" en el proyecto
- Selecciona "PostgreSQL"
- Railway crea automáticamente la BD

**4. Configurar variables de entorno**

En Railway, en tu app (ProyectoM2_SantiagoArtal), pestaña **Variables**, agregar:

```
DATABASE_URL = postgresql://[user]:[password]@[host]:[port]/[db]
NODE_ENV = production
PORT = 5000
```

Railway proporciona `DATABASE_URL` automáticamente desde PostgreSQL.

**5. Crear tablas en la BD remota**

Una vez deployada, desde tu PC ejecuta:

```bash
export DATABASE_URL="tu_url_publica"
node sql/setup-remote.js
```

Esto crea las tablas `authors` y `posts` en PostgreSQL remota.

**6. Verificar que funciona**

```bash
curl https://tu-app.railway.app/health
curl https://tu-app.railway.app/authors
```

### URLs

```
Local: http://localhost:3000
Producción: https://proyectom2santiagoartal-production.up.railway.app
```

### Deploy automático

Después del primer deploy, cada `git push` redeploya automáticamente:

```bash
git add .
git commit -m "cambios"
git push
```

Railway detecta el cambio y ejecuta `npm install && npm start` automáticamente.

### Troubleshooting

**API retorna 500 en GET /authors**
- Verificar que `DATABASE_URL` está en Variables de Railway
- Ver logs en Railway dashboard

**"relation authors does not exist"**
- Correr `node sql/setup-remote.js` para crear tablas

**"Cannot find module"**
- Verificar que `package.json` tiene todas las dependencias
- Hacer `git push` nuevamente para retriggerear el deploy

---

**Construído como proyecto de aprendizaje en SoyHenry.**
