## Avance y problemas pendientes (08/06/2025)

- Se implementó lógica de permisos por rol (admin, cajero).
- El usuario admin funciona correctamente.
- El usuario negocio (cajero) solo ve inventario, pero no contabilidad en el sidebar.
- Al intentar acceder a contabilidad, recibe "Acceso denegado".
- Al intentar acciones no permitidas en inventario, es redirigido al login (debe mostrar acceso denegado).
- Hay más de 900 archivos pendientes por falta de .gitignore y control de versiones.
- Próximo paso: limpiar archivos, mejorar lógica de sidebar y rutas protegidas, y documentar todo el flujo.

## Avance (07/06/2025): Login real y pruebas de permisos

- El login ahora utiliza el modelo de usuario real y bcryptjs, permitiendo autenticación segura con hash.
- Se puede crear usuarios de prueba con rol y plan, y obtener JWT válidos para pruebas de permisos.
- Todos los endpoints protegidos pueden ser probados con el token generado.
- El flujo de autenticación y autorización es ahora profesional y listo para pruebas desde frontend y Postman.
## Avance (07/06/2025): Protección de módulos con permisos avanzados

- Todos los endpoints principales (productos, categorías, movimientos, proveedores, reportes) están protegidos con middleware de permisos según rol y plan.
- El middleware valida el JWT, obtiene el usuario, su rol y plan, y verifica si tiene acceso al módulo y acción solicitada.
- Si el usuario no tiene permiso, la API responde con 403 y un mensaje claro.
- Este patrón es reutilizable y se debe aplicar a cualquier nuevo módulo o endpoint crítico.
- El frontend debe mostrar feedback claro ante errores de permisos ("No tienes acceso a esta función").
## Avance (07/06/2025): Protección de módulos con permisos avanzados

- Todos los endpoints críticos de productos, categorías, movimientos, proveedores y reportes están protegidos con un middleware de permisos.
- El middleware valida el JWT, el plan y el rol del usuario, y permite o deniega el acceso según los permisos configurados.
- El patrón es reutilizable y escalable para cualquier nuevo módulo o función.
- El feedback de errores de permisos es claro y consistente, tanto en backend como en frontend.
## Arquitectura de permisos y protección de endpoints (actualización 07/06/2025)

- El backend implementa un sistema de roles y planes referenciados en el modelo de usuario.
- Cada rol define permisos por módulo y acción (crear, leer, editar, eliminar).
- Cada plan define los módulos y beneficios disponibles según el nivel contratado (básico, negocio, contable, empresarial, etc.).
- Se implementará un middleware de permisos que:
  - Valida el JWT y obtiene el usuario, rol y plan.
  - Verifica si el usuario tiene permiso para la acción y módulo solicitado, combinando los permisos de su rol y los módulos de su plan.
  - Si no tiene permiso, responde con 403 y mensaje claro.
- Todos los endpoints críticos (CRUD, reportes, configuración, etc.) deben protegerse con este middleware.
- El frontend debe mostrar feedback claro ante errores de permisos ("No tienes acceso a esta función").
- Esta arquitectura permite escalar y personalizar la plataforma para distintos clientes y necesidades, y facilita la creación de nuevos planes y roles en el futuro.
## Notas sobre Roles y Seguridad (20/05/2025)

- El módulo de Roles actualmente no tiene lógica real de API ni protección JWT.
- Cuando se implemente el CRUD real de roles/usuarios, se debe proteger con JWT y aplicar el mismo patrón de manejo de sesión y feedback de errores que en los otros módulos.
- Esto incluye: redirección automática a login si el token es inválido/expirado, y mostrar mensajes claros de error de la API.
# Prompt de Contexto para Inventory POS (Uso con GitHub Copilot)

## Descripción General
Inventory POS es un sistema profesional de Punto de Venta (POS) orientado a pequeños y medianos negocios, enfocado en robustez, seguridad, optimización y buenas prácticas de desarrollo colaborativo. El proyecto está estructurado en frontend (React + Vite + Tailwind) y backend (Node.js + Express), con autenticación JWT y endpoints protegidos.

## Instrucciones y Preferencias del Usuario
- Todo cambio debe ser probado y aprobado por el usuario antes de hacer commit y pull request.
- Se trabaja por issues, cada uno en su propia rama, siguiendo el flujo: desarrollo → pruebas → commit → push → pull request → merge → eliminar rama.
- El código debe ser modular, profesional y fácil de escalar.
- Se prioriza la seguridad (autenticación, validación de datos, roles).
- El frontend debe ser coherente, moderno y responsive, con buen UX.
- El backend debe ser limpio, documentado y con endpoints REST claros.
- Siempre se debe proteger la rama `main` y evitar pushes directos.
- Se documentan los endpoints y el flujo de trabajo.


## Cambios y Avances hasta la Fecha (07/06/2025)
- Estructura base del backend creada y modularizada.
- Autenticación JWT implementada y probada (login y rutas protegidas).
- CRUD de productos, categorías y movimientos implementado y protegido, probado exitosamente desde frontend y Postman.
- Feedback profesional y uniforme en frontend (Notification, manejo de errores, UX).
- Flujo de trabajo profesional: ramas por issue, PR, merge y limpieza de ramas.
- Frontend avanzado y coherente, siguiendo buenas prácticas de diseño y colaboración.
- Se documenta que el módulo de Roles aún no está implementado por decisión estratégica, y será abordado con enfoque de seguridad y permisos avanzados.
- Se adopta la visión de plataforma escalable y modular, con un plan empresarial como base y posibilidad de crear planes personalizados (básico, negocio, contable, etc.), donde los módulos y permisos se asignan según el plan y el rol del usuario.

## Reglas para futuros agentes/copilots

- El frontend debe implementar un patrón uniforme de manejo de errores y feedback de la API en todas las páginas:
  - Usar el estado `notif` y el componente `Notification` para mostrar mensajes de éxito, error o información.
  - Ante errores de autenticación (401) se debe limpiar el token y redirigir a login; los 403 deben mostrar "Acceso denegado" sin cerrar la sesión.
  - Mostrar mensajes claros y amigables al usuario, tanto para errores de validación como de backend.
  - Todas las páginas deben tener preparado el patrón, aunque aún no consuman la API, para facilitar futuras integraciones.
  - Ejemplo de uso:
    ```js
    const [notif, setNotif] = useState({ open: false, message: "", type: "info" });
    <Notification open={notif.open} message={notif.message} type={notif.type} onClose={() => setNotif({ ...notif, open: false })} />
    // Para mostrar feedback:
    setNotif({ open: true, message: "Mensaje", type: "success" });
    ```

## Buenas prácticas adicionales (actualización 07/06/2025)

- Antes de hacer stage/commit/push, ejecutar pruebas automáticas o manuales rápidas sobre los endpoints principales del backend y flujos clave del frontend.
- Documentar en este archivo cualquier preferencia profesional o flujo de trabajo nuevo que el usuario indique.
- Mantener la estructura de carpetas limpia y evitar carpetas o archivos duplicados/confusos (por ejemplo, no debe haber carpetas `backend/backend`).
- Nunca subir archivos `.env` ni credenciales reales; usar `.env.example` como guía y crear copias locales ignoradas por git.
- Los scripts de inicialización de base de datos deben cargar el archivo `.env` de forma robusta, usando rutas absolutas si es necesario.
- El backend debe validar y mostrar errores claros en consola si faltan variables de entorno críticas.
- El frontend debe consumir la API usando variables de entorno (`VITE_API_URL`) y centralizar la lógica de fetch en utilidades reutilizables.
- Siempre probar el flujo completo (login, CRUD, feedback) tras cambios estructurales o de integración.

- Leer este archivo antes de continuar el desarrollo.
- Mantener el mismo estándar de calidad y flujo de trabajo.
- Seguir la lista de issues y prioridades establecidas por el usuario.
- Consultar siempre antes de hacer cambios estructurales o de diseño.
- Documentar todo avance relevante en este archivo para futuras sesiones.
- El flujo para cerrar issues es: (1) El usuario crea la rama para el issue, (2) el agente realiza los cambios y pruebas, (3) el agente hace push, crea el pull request y lo mergea tras aprobación, (4) el agente elimina la rama remota y local, (5) se documenta el cierre en este archivo.
- El agente debe registrar en este archivo cualquier preferencia o flujo de trabajo que el usuario indique durante el desarrollo, para futuras interacciones.

---
Este prompt debe ser usado como contexto inicial si se reinicia el chat o se cambia de agente, para garantizar continuidad y coherencia en el desarrollo del proyecto.
