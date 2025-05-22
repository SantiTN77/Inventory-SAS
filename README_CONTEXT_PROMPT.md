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

## Cambios y Avances hasta la Fecha (13/05/2025)
- Estructura base del backend creada y modularizada.
- Autenticación JWT implementada y probada (login y rutas protegidas).
- CRUD de productos implementado y protegido, probado exitosamente desde Postman.
- Flujo de trabajo profesional: ramas por issue, PR, merge y limpieza de ramas.
- Frontend avanzado y coherente, siguiendo buenas prácticas de diseño y colaboración.

## Reglas para futuros agentes/copilots
- Leer este archivo antes de continuar el desarrollo.
- Mantener el mismo estándar de calidad y flujo de trabajo.
- Seguir la lista de issues y prioridades establecidas por el usuario.
- Consultar siempre antes de hacer cambios estructurales o de diseño.
- Documentar todo avance relevante en este archivo para futuras sesiones.

---
Este prompt debe ser usado como contexto inicial si se reinicia el chat o se cambia de agente, para garantizar continuidad y coherencia en el desarrollo del proyecto.
