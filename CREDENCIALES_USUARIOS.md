# 🔑 Credenciales de Usuarios - Inventory-SAS

Este documento contiene todas las credenciales de los usuarios creados para probar diferentes niveles de permisos en el sistema.

## 📋 Usuarios Disponibles

### 1. 👑 Administrador Demo (Principal)
**Email:** `demo@email.com`  
**Password:** `demo123`  
**Rol:** admin  
**Plan:** Empresarial  
**Permisos:** Acceso completo a todos los módulos y acciones

**Módulos habilitados:**
- ✅ Inventario (crear, leer, editar, eliminar)
- ✅ Categorías (crear, leer, editar, eliminar)
- ✅ Proveedores (crear, leer, editar, eliminar)
- ✅ Contabilidad (crear, leer, editar, eliminar)
- ✅ Roles (crear, leer, editar, eliminar)
- ✅ Usuarios (crear, leer, editar, eliminar)
- ✅ Reportes (crear, leer, editar, eliminar)
- ✅ Estadísticas

---

### 2. 👤 Usuario Estándar
**Email:** `usuario@test.com`  
**Password:** `usuario123`  
**Rol:** usuario  
**Plan:** Básico  
**Permisos:** Solo lectura en módulos básicos

**Módulos habilitados:**
- ✅ Inventario (solo leer)
- ✅ Categorías (solo leer)
- ❌ Proveedores (no tiene acceso)
- ❌ Contabilidad (no tiene acceso)
- ❌ Roles (no tiene acceso)
- ❌ Usuarios (no tiene acceso)
- ❌ Reportes (no tiene acceso)

**Pruebas sugeridas:**
- ✅ Debe poder ver productos y categorías
- ❌ NO debe poder crear, editar o eliminar productos
- ❌ NO debe poder acceder a módulos restringidos

---

### 3. 💼 Contador
**Email:** `contador@test.com`  
**Password:** `contador123`  
**Rol:** contador  
**Plan:** Contable  
**Permisos:** Acceso a módulos financieros y lectura en inventario

**Módulos habilitados:**
- ✅ Inventario (solo leer)
- ✅ Categorías (solo leer)
- ✅ Contabilidad (crear, leer, editar)
- ✅ Reportes (solo leer)

**Permisos específicos:**
- ✅ Lectura en inventario y categorías
- ✅ CRUD completo en contabilidad/movimientos
- ✅ Lectura en reportes
- ❌ NO puede eliminar en contabilidad
- ❌ NO tiene acceso a roles, usuarios, proveedores

**Pruebas sugeridas:**
- ✅ Debe poder ver inventario y categorías
- ✅ Debe poder crear, editar movimientos de contabilidad
- ❌ NO debe poder eliminar movimientos
- ❌ NO debe poder acceder a módulos de administración

---

### 4. 👑 Admin Test
**Email:** `admin@test.com`  
**Password:** `admin123`  
**Rol:** admin  
**Plan:** Empresarial  
**Permisos:** Acceso completo (igual que demo@email.com)

**Módulos habilitados:**
- ✅ Todos los módulos con todos los permisos

**Pruebas sugeridas:**
- ✅ Debe tener acceso completo igual que demo@email.com

---

### 5. 🏢 Usuario Negocio
**Email:** `negocio@test.com`  
**Password:** `negocio123`  
**Rol:** usuario  
**Plan:** Negocio  
**Permisos:** Acceso limitado según rol usuario pero con más módulos habilitados

**Módulos habilitados en el plan:**
- ✅ Inventario
- ✅ Categorías
- ✅ Proveedores
- ✅ Reportes

**Permisos según rol usuario:**
- ✅ Inventario (solo leer)
- ✅ Categorías (solo leer)
- ❌ Proveedores (plan lo habilita pero rol no tiene permisos)
- ❌ Reportes (plan lo habilita pero rol no tiene permisos)

**Pruebas sugeridas:**
- ✅ Debe poder ver inventario y categorías
- ❌ NO debe poder crear, editar o eliminar
- ⚠️ Puede que vea módulos en el menú pero sin permisos para usarlos

---

## 🧪 Guía de Pruebas de Permisos

### Escenario 1: Usuario con Permisos Limitados
1. Login con `usuario@test.com / usuario123`
2. Verificar que solo vea módulos de Inventario y Categorías
3. Intentar crear un producto → Debe fallar con error 403
4. Intentar editar un producto → Debe fallar con error 403
5. Intentar acceder a Contabilidad → No debe aparecer en el menú o debe redirigir

### Escenario 2: Contador con Acceso Financiero
1. Login con `contador@test.com / contador123`
2. Verificar que vea Inventario, Categorías, Contabilidad y Reportes
3. Verificar que pueda leer productos pero no editarlos
4. Verificar que pueda crear movimientos en contabilidad
5. Verificar que pueda editar movimientos en contabilidad
6. Intentar eliminar un movimiento → Debe fallar (solo tiene crear, leer, editar)

### Escenario 3: Admin con Acceso Completo
1. Login con `demo@email.com / demo123` o `admin@test.com / admin123`
2. Verificar acceso a todos los módulos
3. Verificar que pueda realizar todas las acciones (crear, leer, editar, eliminar)
4. Verificar que no reciba errores 403 en ninguna acción

### Escenario 4: Verificación de Planes
1. Login con `negocio@test.com / negocio123`
2. Verificar que el plan "Negocio" habilita más módulos
3. Verificar que el rol "usuario" limita los permisos
4. Confirmar que la combinación plan+rol funciona correctamente

---

## 📝 Notas Importantes

1. **Todos los usuarios tienen la contraseña con el patrón:** `[rol]123` o `demo123`
2. **El usuario demo es el principal** para desarrollo y pruebas generales
3. **Los usuarios de prueba** están diseñados específicamente para probar permisos
4. **Si necesitas resetear usuarios**, ejecuta: `node backend/scripts/createTestUsers.js`
5. **Para resetear todos los datos**, ejecuta: `node backend/scripts/initData.js`

---

## 🔄 Resetear Usuarios

Si necesitas recrear los usuarios de prueba:

```bash
cd backend
node scripts/createTestUsers.js
```

Esto actualizará o creará todos los usuarios de prueba con las credenciales mostradas arriba.

---

**Última actualización:** 6 de Enero, 2026

