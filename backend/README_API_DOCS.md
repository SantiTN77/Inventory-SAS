# Documentación de la API - Inventory POS

## Autenticación
- **POST** `/auth/login` — Login de usuario, retorna JWT.

## Productos
- **GET** `/api/productos` — Listar productos (protegido)
- **GET** `/api/productos/:id` — Obtener producto por ID (protegido)
- **POST** `/api/productos` — Crear producto (protegido, validado)
- **PUT** `/api/productos/:id` — Actualizar producto (protegido, validado)
- **DELETE** `/api/productos/:id` — Eliminar producto (protegido)

## Categorías
- **GET** `/api/categorias` — Listar categorías (protegido)
- **GET** `/api/categorias/:id` — Obtener categoría por ID (protegido)
- **POST** `/api/categorias` — Crear categoría (protegido, validado)
- **PUT** `/api/categorias/:id` — Actualizar categoría (protegido, validado)
- **DELETE** `/api/categorias/:id` — Eliminar categoría (protegido)

## Proveedores
- **GET** `/api/proveedores` — Listar proveedores (protegido)
- **GET** `/api/proveedores/:id` — Obtener proveedor por ID (protegido)
- **POST** `/api/proveedores` — Crear proveedor (protegido, validado)
- **PUT** `/api/proveedores/:id` — Actualizar proveedor (protegido, validado)
- **DELETE** `/api/proveedores/:id` — Eliminar proveedor (protegido)

## Movimientos
- **GET** `/api/movimientos` — Listar movimientos (protegido)
- **GET** `/api/movimientos/:id` — Obtener movimiento por ID (protegido)
- **POST** `/api/movimientos` — Crear movimiento (protegido, validado)
- **PUT** `/api/movimientos/:id` — Actualizar movimiento (protegido, validado)
- **DELETE** `/api/movimientos/:id` — Eliminar movimiento (protegido)

## Reportes
- **GET** `/api/reportes/ventas` — Reporte de ventas (protegido)
- **GET** `/api/reportes/inventario` — Reporte de inventario (protegido)
- **GET** `/api/reportes/movimientos` — Reporte de movimientos (protegido)

---

**Todos los endpoints protegidos requieren el header:**
```
Authorization: Bearer <token>
```

**Validaciones:**
- Se usa Joi para validar los datos de entrada en POST y PUT.
- Respuestas de error claras en caso de datos inválidos.

---

> Para detalles de cada campo y ejemplos de request/response, consulta el código fuente o solicita ejemplos específicos.
