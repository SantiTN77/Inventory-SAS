const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const { authMiddleware } = require('../controllers/authController');

// Todas las rutas protegidas por autenticación
router.get('/', authMiddleware, providerController.getAll);
router.get('/:id', authMiddleware, providerController.getById);
router.post('/', authMiddleware, providerController.create);
router.put('/:id', authMiddleware, providerController.update);
router.delete('/:id', authMiddleware, providerController.remove);

module.exports = router;
