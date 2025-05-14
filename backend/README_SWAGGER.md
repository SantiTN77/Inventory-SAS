# Documentación Swagger/OpenAPI (pendiente de automatizar)

Puedes documentar la API usando Swagger UI o Redocly para facilitar la exploración y pruebas interactivas.

## Sugerencia de integración rápida:

1. Instala swagger-ui-express y yamljs:
   ```bash
   npm install swagger-ui-express yamljs
   ```
2. Crea un archivo `swagger.yaml` con la especificación OpenAPI de tus endpoints.
3. Agrega en tu `src/index.js`:
   ```js
   const swaggerUi = require('swagger-ui-express');
   const YAML = require('yamljs');
   const swaggerDocument = YAML.load('./swagger.yaml');
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
   ```
4. Accede a la documentación en `/api-docs`.

---

> Puedes generar el archivo swagger.yaml automáticamente con herramientas como [Swagger Editor](https://editor.swagger.io/) o [SwaggerHub](https://swagger.io/tools/swaggerhub/).
