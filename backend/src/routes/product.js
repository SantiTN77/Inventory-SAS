const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware } = require('../controllers/authController');

// Todas las rutas protegidas por autenticación
router.get('/', authMiddleware, productController.getAll);
router.get('/:id', authMiddleware, productController.getById);
router.post('/', authMiddleware, productController.create);
router.put('/:id', authMiddleware, productController.update);
router.delete('/:id', authMiddleware, productController.remove);

module.exports = router;
