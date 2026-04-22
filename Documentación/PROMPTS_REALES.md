# PROMPTS REALES UTILIZADOS EN EL PROYECTO

## FASE 1-2: Setup & Schema SQL

### Prompt 1: Estructura de Carpetas

**Prompt:**
```
Necesito un proyecto Node.js + Express + PostgreSQL para una API REST.
Quiero crear una API de blog simple con usuarios y posts.
Dame la estructura de carpetas recomendada y qué va en cada carpeta.
```

**Respuesta que me diste (resumida):**
```
/src
  /routes
  /controllers
  /services
  /middleware
/sql
/tests
```

**Cómo influyó:** Definió la arquitectura 3-layer que usé en todo el proyecto.

---

### Prompt 2: Schema SQL para Authors y Posts

**Prompt:**
```
Crea un schema SQL para una plataforma de blog.
Necesito:
- Tabla authors (id, name, email único, bio, timestamps)
- Tabla posts (id, title, content, author_id con FK, published boolean, timestamps)
Quiero relaciones, índices y ON DELETE CASCADE.
```

**Respuesta que me diste (resumida):**
Generó el `schema.sql` que usé (casi sin cambios). Solo ajusté:
- VARCHAR lengths según requisitos
- Nombres de índices para claridad

**Cómo influyó:** Fue el foundation de todo el proyecto de BD.

---

## FASE 3: Conexión PostgreSQL

### Prompt 3: Pool de Conexión en pg

**Prompt:**
```
Crea un módulo db.js que use pg.Pool para conectar a PostgreSQL.
Necesita:
- Soportar DATABASE_URL para Railway
- Variables de entorno para desarrollo local
- Manejo de errores
```

**Respuesta que me diste (resumida):**
Generó el código base de `src/db.js`. 

**Cambios manuales:**
- Ajusté la lógica de prioridad (DATABASE_URL primero)
- Agregué fallback a variables individuales

**Cómo influyó:** Patrón de Pool que uso en toda la app.

---

## FASE 4: Endpoints CRUD

### Prompt 4: Estructura de Authors Routes

**Prompt:**
```
Genera las rutas para CRUD de authors:
- GET / (listar todos)
- GET /:id (uno)
- POST / (crear)
- PUT /:id (actualizar)
- DELETE /:id (borrar)

Cada ruta debe llamar a authorsController.
```

**Respuesta que me diste (resumida):**
Generó `routes/authors.js` básico.

**Cambios manuales:**
- Agregué validaciones específicas en controllers
- Ajusté códigos HTTP

**Cómo influyó:** Template que repliqué para posts.

---

### Prompt 5: Controller con Manejo de Errores PostgreSQL

**Prompt:**
```
Crea authorsController que:
- Reciba name, email, bio en el request
- Valide que name y email no están vacíos
- Llame a authorsService
- Maneje error code 23505 (email único) como 400
- Retorne códigos HTTP correctos (201, 404, 400, 500)
```

**Respuesta que me diste (resumida):**
Generó el patrón base de error handling con códigos PostgreSQL.

**Cambios manuales:**
- Mensajes de error específicos
- Lógica de validación más estricta
- Testing manual de cada endpoint

**Cómo influyó:** Patrón de error handling que uso en todos los controllers.

---

### Prompt 6: Services Layer - Authors

**Prompt:**
```
Crea authorsService.js con métodos:
- getAll()
- getById(id)
- create(name, email, bio)
- update(id, name, email, bio)
- delete(id)

Cada uno ejecuta SQL parametrizado usando el pool.
```

**Respuesta que me diste (resumida):**
Generó los 5 métodos básicos con queries SQL parametrizadas.

**Cambios manuales:**
- Ajusté los RETURNING * según campos
- Agregué ORDER BY
- Probé cada query manualmente en PostgreSQL

**Cómo influyó:** Template para postsService después.

---

## FASE 5: Tests Unitarios

### Prompt 7: Setup de Jest + Supertest

**Prompt:**
```
Configura Jest para testear una app Express.
Necesito:
- jest.config.js
- Usar Supertest para hacer requests HTTP
- beforeAll para crear tablas
- afterAll para cerrar conexión
```

**Respuesta que me diste (resumida):**
Generó `jest.config.js` y patrón básico de test.

**Cambios manuales:**
- Ajusté paths del testMatch
- Configuré collectCoverageFrom específicamente

**Cómo influyó:** Config que usé sin cambios.

---

### Prompt 8: Test Cases para Authors CRUD

**Prompt:**
```
Crea tests/authors.test.js que cubra:
- POST / crear author válido → 201
- POST / sin name → 400
- POST / email duplicado → 400
- GET / listar → 200
- GET /:id válido → 200
- GET /:id inexistente → 404
- PUT / actualizar → 200
- DELETE / → 204
```

**Respuesta que me diste (resumida):**
Generó template de test cases básicos.

**Cambios manuales:**
- Agregué más casos edge (validaciones específicas)
- Ajusté los datos de prueba
- Debugueé tests que fallaban

**Cómo influyó:** Estructura de tests que repliqué para posts.

---

## FASE 6: OpenAPI Documentation

### Prompt 9: OpenAPI Schema para API REST

**Prompt:**
```
Crea openapi.yaml versión 3.0 que documente:
- 6 endpoints de authors (CRUD)
- 6 endpoints de posts (CRUD)
- 1 health check
- Schemas para Author, Post, PostWithAuthor
- Todos los códigos HTTP (200, 201, 204, 400, 404, 500)
- Parámetros y request bodies
```

**Respuesta que me diste (resumida):**
Generó ~400 líneas de openapi.yaml prácticamente completo.

**Cambios manuales:**
- Validé que ejemplos coincidan con datos reales
- Ajusté descripciones
- Agregué el servidor de producción (Railway)

**Cómo influyó:** Fue 80% generado, 20% manual.

---

## FASE 7: Railway Deployment

### Prompt 10: Guía de Deployment en Railway

**Prompt:**
```
Dame pasos para desplegar una app Node.js + PostgreSQL en Railway:
- Crear cuenta
- Conectar GitHub
- Agregar PostgreSQL
- Variables de entorno
- Crear tablas en BD remota
- Verificar que funciona
```

**Respuesta que me diste (resumida):**
Generó la guía FASE7_RAILWAY.md básica.

**Cambios manuales:**
- Probé cada paso manualmente
- Debugueé problemas de DATABASE_URL
- Creé script setup-remote.js
- Testé endpoints en producción

**Cómo influyó:** Guía que seguí step-by-step manualmente.

---

### Prompt 11: Script para Crear Tablas en BD Remota

**Prompt:**
```
Crea un script Node.js que:
- Lea DATABASE_URL desde variable de entorno
- Conecte a PostgreSQL remota
- Lea schema.sql
- Ejecute el schema
- Verifique que las tablas existen
- Retorne éxito/error
```

**Respuesta que me diste (resumida):**
Generó `setup-remote.js` básico.

**Cambios manuales:**
- Ajusté para manejar mejor errores
- Probé manualmente la conexión
- Debugueé problemas de conexión a Railway

**Cómo influyó:** Script crítico para deploy en Railway.

---

## Prompts Adicionales (Debugging & Troubleshooting)

### Prompt 12: Por qué falla POST /authors

**Prompt:**
```
Mi endpoint POST /authors retorna 500.
El curl es:
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'

El error no es claro. ¿Qué podría estar mal?
```

**Respuesta que me diste:**
Sugirió verificar:
- Si las tablas existen
- Si hay errores de pool
- Si las variables de entorno están correctas

**Cambios manuales:**
- Ejecuté `npm run db:setup`
- Probé la query SQL directamente
- Agregué logs en controller

**Cómo influyó:** Me enseñó a debuggear sistemáticamente.

---

### Prompt 13: Error con DATABASE_URL en Railway

**Prompt:**
```
Mi API en Railway retorna {"error":"Error al obtener autores"} con 500.
En Railway las variables están seteadas pero la app no las ve.
¿Qué podría estar pasando?
```

**Respuesta que me diste:**
Sugirió que el código estaba buscando variables individuales (DB_HOST, etc) 
en lugar de DATABASE_URL.

**Cambios manuales:**
- Modifiqué `src/db.js` para priorizar DATABASE_URL
- Commiteé el cambio
- Railway redeploy automático
- Testé de nuevo

**Cómo influyó:** Fue mi mayor debugging en Railway.

---

## Resumen: Dónde Fue Usado IA

| Fase | % IA | Qué Generó | Qué Fue Manual |
|------|------|-----------|---------------|
| 1-2 Setup | 50% | Estructura carpetas, schema SQL | Ajustes según requisitos |
| 3 BD | 60% | Pool pattern, src/db.js | Debugging, fallbacks |
| 4 Endpoints | 60% | Routes, Controllers, Services template | Validaciones, lógica específica |
| 5 Tests | 70% | Jest config, test structure | Casos específicos, debugging |
| 6 OpenAPI | 85% | openapi.yaml completo | Validación, ejemplos |
| 7 Railway | 50% | Guía, script setup-remote | Setup manual, debugging |

**Promedio Total: ~60%**

---

## Lo que Aprendí

1. **IA es mejor para boilerplate** - Generó bien estructura estándar
2. **Debugging es manual** - Tuve que entender errores y solucionarlos
3. **Testing valida** - Los tests me mostraron qué estaba mal
4. **Integración requiere comprensión** - Entender cómo se conectan las partes
5. **Documentación requiere precisión** - Validar que OpenAPI coincida con código real

---

## Cómo Reproducir (Para SoyHenry)

Si necesitas validar el trabajo:

1. **Revisar git log** - Cada commit muestra qué se agregó
2. **Probar tests** - `npm test` valida toda la lógica
3. **Probar endpoints** - Curl contra la API en Railway
4. **Revisar código** - Es standard, legible, bien estructurado
5. **Revisar documentación** - OpenAPI documenta precisamente

El hecho de que funcione en producción es la mejor validación.
