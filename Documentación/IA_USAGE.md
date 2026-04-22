# Documentación de Uso de IA

## Resumen

Este proyecto utilizó **herramientas de IA** como apoyo en aproximadamente **60% del desarrollo**, principalmente en la arquitectura, boilerplate y documentación. El trabajo de integración, testing, debugging y deployment fue manual.

## Herramientas de IA Utilizadas

- **GitHub Copilot** - Asistente de código en VS Code
- **Claude/Chat IA** - Asistencia en arquitectura y debugging

## Fases del Proyecto y Uso de IA

### Fase 1-2: Setup & SQL Schema
**Uso de IA:** 40%
- **Asistencia:** Generar estructura de carpetas y plantilla inicial de `schema.sql`
- **Trabajo Manual:** Ajustar relaciones, agregar constraints y índices según requisitos

### Fase 3: Conexión PostgreSQL
**Uso de IA:** 50%
- **Asistencia:** Boilerplate de Pool de pg, patrón de conexión
- **Trabajo Manual:** Debugging de conexión, validar que funciona localmente

### Fase 4: Endpoints CRUD
**Uso de IA:** 60%
- **Asistencia:** 
  - Generar estructura de routes/controllers/services
  - Template de endpoints RESTful
  - Manejo de errores con códigos PostgreSQL
- **Trabajo Manual:** 
  - Implementación específica de validaciones
  - Testing de cada endpoint
  - Debugging de lógica de negocio

### Fase 5: Tests Unitarios
**Uso de IA:** 70%
- **Asistencia:** 
  - Estructura básica de Jest + Supertest
  - Template de beforeAll/afterAll
  - Patrones de assertions
- **Trabajo Manual:** 
  - Casos de prueba específicos
  - Debugging de fallos
  - Validación manual en navegador/curl

### Fase 6: OpenAPI Documentation
**Uso de IA:** 80%
- **Asistencia:** 
  - Generar esquema OpenAPI 3.0
  - Estructura de paths y schemas
  - Documentación de responses
- **Trabajo Manual:** 
  - Validar que coincida con endpoints reales
  - Ajustar ejemplos según BD

### Fase 7: Railway Deployment
**Uso de IA:** 50%
- **Asistencia:** 
  - Guía de pasos en Railway
  - Troubleshooting de DATABASE_URL
  - Scripts para crear tablas remotas
- **Trabajo Manual:** 
  - Crear cuenta y proyecto en Railway
  - Configurar variables
  - Testing de endpoints en producción
  - Debugging de conexión a BD

---

## Cómo IA Influyó en el Desarrollo

### Aspectos Positivos
1. **Arquitectura Limpia** - IA propuso 3-layer pattern (routes/controllers/services) que mejoró mantenibilidad
2. **Boilerplate Rápido** - Generó código repetitivo (CRUD básico) permitiendo enfocarse en lógica
3. **Documentación** - Generó estructura de OpenAPI que de otro modo habría tomado más tiempo
4. **Debugging** - Sugirió soluciones a errores comunes (error codes de PostgreSQL, variable scoping)

### Decisiones Manuales
- Qué validaciones incluir en cada endpoint
- Cuándo validar en controller vs service
- Estructura de mensajes de error
- Test cases específicos para cubrir edge cases
- Estrategia de deployment en Railway

---

## Líneas de Código por Origen

| Componente | Total LOC | IA Generado | Manual | % IA |
|-----------|----------|-------------|--------|------|
| src/services/*.js | 120 | 70 | 50 | 58% |
| src/controllers/*.js | 150 | 80 | 70 | 53% |
| src/routes/*.js | 50 | 30 | 20 | 60% |
| tests/*.test.js | 300 | 150 | 150 | 50% |
| openapi.yaml | 400 | 350 | 50 | 87% |
| sql/*.sql | 80 | 40 | 40 | 50% |
| package.json, config | 50 | 30 | 20 | 60% |
| **TOTAL** | **1150** | **750** | **400** | **~65%** |

---

## Aprendizajes

1. **IA es mejor para boilerplate que para lógica** - Generó bien estructura, pero validaciones específicas requirieron trabajo manual
2. **Debugging es responsabilidad del dev** - IA sugirió soluciones, pero entender/testear fue manual
3. **Integración es clave** - Juntar componentes generados requirió comprensión de la arquitectura
4. **Testing valida IA** - Los 25+ tests confirmaron que lo generado funciona correctamente

---

## Conclusión

Este proyecto demuestra que **IA es una herramienta de productividad**, no un reemplazo. Se utilizó para:
- Acelerar boilerplate
- Sugerir patrones
- Generar documentación

Pero requirió:
- Comprensión de la arquitectura
- Testing exhaustivo
- Debugging manual
- Decisiones de diseño

El resultado es una API profesional, deployada en producción y testeable.
