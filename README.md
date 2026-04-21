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

Ver documentación de tests en `Documentación IA/FASE5_TESTS.md`

## 📖 Documentación OpenAPI

El archivo `openapi.yaml` contiene la especificación completa de la API.

Puedes visualizarla en:
- **Swagger Editor Online:** https://editor.swagger.io (copia el contenido de `openapi.yaml`)
- **Localmente:** Instala `swagger-ui-express` y expón /api-docs (ver `Documentación IA/FASE6_OPENAPI.md`)

Ver documentación en `Documentación IA/FASE6_OPENAPI.md`

## 🚢 Deployment en Railway

Ver `Documentación IA/FASE7_RAILWAY.md` (próximamente).

---

**Construído como proyecto de aprendizaje en SoyHenry.**
