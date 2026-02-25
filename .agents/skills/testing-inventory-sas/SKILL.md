# Testing Inventory-SAS Locally

## Overview
Inventory-SAS is a SaaS inventory system with a Node.js/Express backend (MongoDB) and React/Vite frontend.

## Prerequisites
- Docker (for MongoDB)
- Node.js 20+ (check `.nvmrc`)

## Local Development Setup

### 1. Start MongoDB
```bash
docker run -d --name mongo-test -p 27017:27017 mongo:8
```
If the container already exists but is stopped:
```bash
docker start mongo-test
```

### 2. Create Backend Environment
Create `backend/.env` with:
```
MONGODB_URI=mongodb://localhost:27017/inventory-sas-test
PORT=4000
JWT_SECRET=<any-dev-secret>
```
Note: The `.env` file is gitignored. The `docker-compose.yml` has `env_file` set to `required: false` so it won't block validation.

### 3. Seed the Database
```bash
cd backend && node scripts/initData.js
```
This creates:
- Roles: admin, usuario, contador
- Plans: Empresarial, Basico, Negocio, Contable
- Admin user: demo@email.com / demo123

Passwords are bcrypt-hashed by the seed script.

### 4. Start Backend
```bash
cd backend && npm start
```
Runs on port 4000. Logs "Servidor backend escuchando en puerto 4000" and "Conectado a MongoDB" on success.

### 5. Start Frontend
```bash
cd frontend && npm run dev
```
Runs on port 5173. Vite proxies `/api` and `/auth` requests to `localhost:4000`.

## Test Credentials
- **Admin**: demo@email.com / demo123 (role: admin, plan: Empresarial)
- Other users can be created via the seed script or API

## Key Testing Paths

### Login Flow
- Navigate to `http://localhost:5173` — redirects to `/login`
- Email input should be `type="email"` with autocomplete
- Login stores JWT token and user data (including email, rol, plan) in localStorage

### Profile Page
- Navigate via UserMenu dropdown (click user name at bottom-left of sidebar) → "Perfil"
- Shows name, email, and role from AuthContext (not hardcoded)
- The login API response must include `email` field for this to work

### UserMenu Navigation
- UserMenu uses React Router `<Link>` components for SPA navigation (no full-page reloads)
- "Cerrar sesion" calls `logout()` from AuthContext which clears localStorage and navigates to `/login`

### Notification Badges
- Header bell icon and Sidebar "Notificaciones" link should have NO hardcoded badge numbers

## Common Issues
- If Perfil page shows "Sin email", the login API response may be missing the `email` field — check `backend/src/controllers/authController.js`
- If frontend build fails with `module is not defined`, check that `tailwind.config.js` and `postcss.config.js` use ESM syntax (`export default`) since `package.json` has `"type": "module"`
- After code changes to backend, you must restart the backend server (Ctrl+C and `npm start` again)
- After changing auth-related backend code, log out and log back in to get fresh userData in localStorage

## Devin Secrets Needed
No external secrets required for local testing. MongoDB runs locally via Docker, and JWT_SECRET can be any dev value.
