require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// ── Security headers ──────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────
// Allow origins from env (comma-separated) or fall back to localhost for dev
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin(origin, cb) {
    // Allow requests with no origin (server-to-server, curl, mobile apps)
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// ── Body parsing ──────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));

// ── Rate limiting ─────────────────────────────────────────────────────
// Global: 200 requests per minute per IP
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiadas solicitudes, intenta de nuevo más tarde' },
});
app.use(globalLimiter);

// Strict limiter for auth endpoints: 10 attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiados intentos de autenticación, intenta de nuevo en 15 minutos' },
});
app.use('/auth', authLimiter);

// ── MongoDB connection ────────────────────────────────────────────────
const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri || typeof mongoUri !== 'string') {
  console.error('Error: MONGODB_URI no está definido. Revisa backend/.env');
  process.exit(1);
}
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err.message);
    process.exit(1);
  });

// ── Routes ────────────────────────────────────────────────────────────
const routes = require('./routes');
app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
