const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../controllers/authController');

// Ruta protegida de ejemplo
router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso concedido a ruta protegida', user: req.user });
});

module.exports = router;
