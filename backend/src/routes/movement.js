const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');
const { authMiddleware } = require('../controllers/authController');

// Todas las rutas protegidas por autenticación
router.get('/', authMiddleware, movementController.getAll);
router.get('/:id', authMiddleware, movementController.getById);
router.post('/', authMiddleware, movementController.create);
router.put('/:id', authMiddleware, movementController.update);
router.delete('/:id', authMiddleware, movementController.remove);

module.exports = router;
