# Testing Security Hardening for Inventory-SAS

## Overview
This skill covers testing backend security middleware (helmet, CORS, rate limiting, Joi validation, password stripping) for Inventory-SAS.

## Devin Secrets Needed
- No special secrets needed — uses local MongoDB and default test credentials

## Environment Setup
1. Start MongoDB: `docker start mongo-test` (local Docker container on port 27017)
2. Ensure `backend/.env` has:
   - `MONGODB_URI=mongodb://localhost:27017/inventory-sas-test`
   - `PORT=4000`
   - `JWT_SECRET=<any-value>`
   - `CORS_ORIGIN=http://localhost:5173` (must match frontend dev server origin)
3. Start backend: `node src/index.js` from `backend/` directory
4. Start frontend: `npm run dev` from `frontend/` directory
5. Test credentials: `demo@email.com` / `demo123` (admin role)

## Testing Security Headers (Helmet)
- Login via the frontend UI at http://localhost:5173
- Open DevTools > Network tab
- Click on any API response (e.g., `productos`, `usuarios`)
- Verify these headers are present:
  - `Content-Security-Policy`
  - `Strict-Transport-Security`
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Xss-Protection: 0`
  - `Referrer-Policy: no-referrer`

## Testing CORS Whitelist
- If CORS is misconfigured, the login XHR from localhost:5173 will fail with a CORS error in the browser console
- A successful login proves the CORS whitelist includes the frontend origin
- To test rejection: temporarily change `CORS_ORIGIN` to a different origin and verify requests fail

## Testing Rate Limiting
- Rate limit headers are visible in API responses:
  - `RateLimit-Limit: 200` (global)
  - `RateLimit-Remaining: <count>`
  - `RateLimit-Reset: <seconds>`
- Auth endpoint has stricter limits: 10 requests per 15 minutes
- To test: send 11+ failed login attempts via curl and verify 429 response

## Testing Joi Validation
- Use curl to bypass HTML5 form validation (the `type="email"` input catches invalid emails client-side)
- Test invalid email: `curl -s -X POST http://localhost:4000/auth/login -H 'Content-Type: application/json' -d '{"email":"notanemail","password":"password123"}'`
  - Expected: 400 with `{"message":"El correo electrónico no es válido"}`
- Test short password: `curl -s -X POST http://localhost:4000/auth/login -H 'Content-Type: application/json' -d '{"email":"test@test.com","password":"ab"}'`
  - Expected: 400 with `{"message":"La contraseña debe tener al menos 6 caracteres"}`

## Testing Password Stripping
- Get auth token via login
- `curl -s http://localhost:4000/api/usuarios -H "Authorization: Bearer $TOKEN"`
- Verify response does NOT contain a `password` field
- Fields should be: `_id`, `nombre`, `email`, `rol`, `plan`, `activo`, `createdAt`, `updatedAt`, `__v`

## Known Issues / Tips
- The `browser_console` tool may not detect Chrome as foreground when DevTools is detached — use curl for API-level testing instead
- When starting the backend in a background shell, do NOT use `&` — use `run_in_background=true` parameter instead
- Backend may exit silently if `.env` is missing or `MONGODB_URI` is not set — always check backend shell output after starting
