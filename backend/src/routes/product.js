const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware } = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { productSchema } = require('../models/schemas');

// Todas las rutas protegidas por autenticación
router.get('/', authMiddleware, productController.getAll);
router.get('/:id', authMiddleware, productController.getById);
router.post('/', authMiddleware, validate(productSchema), productController.create);
router.put('/:id', authMiddleware, validate(productSchema), productController.update);
router.delete('/:id', authMiddleware, productController.remove);

module.exports = router;
