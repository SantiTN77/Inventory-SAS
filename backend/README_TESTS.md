# Pruebas y validaciones de la API - Inventory POS

## Pruebas unitarias y de integración (pendiente de automatizar)

### Manuales (recomendado para QA inicial):

1. **Autenticación:**
   - Login correcto y con credenciales inválidas.
   - Token requerido en endpoints protegidos.

2. **CRUD Productos, Categorías, Proveedores, Movimientos:**
   - Crear, leer, actualizar y eliminar cada entidad.
   - Validar errores por datos inválidos (campos vacíos, tipos incorrectos, etc).
   - Validar acceso denegado sin token o con token inválido.

3. **Reportes:**
   - Acceso a reportes con y sin token.
   - Validar formato de respuesta.

4. **Validación de datos:**
   - Probar que los endpoints rechazan datos inválidos según los esquemas Joi.

---

## Automatización sugerida
- Usar Jest, Mocha o Supertest para automatizar pruebas de endpoints y validaciones.
- Incluir pruebas de integración para flujos completos (login + CRUD + reportes).

---

> Para detalles de comandos de prueba manual, consulta el archivo `README_API_DOCS.md` o solicita ejemplos específicos.
