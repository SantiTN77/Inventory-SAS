const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authMiddleware } = require('../controllers/authController');

// Todas las rutas protegidas por autenticación
router.get('/', authMiddleware, categoryController.getAll);
router.get('/:id', authMiddleware, categoryController.getById);
router.post('/', authMiddleware, categoryController.create);
router.put('/:id', authMiddleware, categoryController.update);
router.delete('/:id', authMiddleware, categoryController.remove);

module.exports = router;
