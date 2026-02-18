const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware } = require('../controllers/authController');
const checkPermiso = require('../middlewares/checkPermiso');
const validate = require('../middlewares/validate');
const { productSchema } = require('../models/schemas');

// Todas las rutas protegidas por autenticación
router.get('/', authMiddleware, checkPermiso('inventario', 'leer'), productController.getAll);
router.get('/:id', authMiddleware, checkPermiso('inventario', 'leer'), productController.getById);
router.post('/', authMiddleware, checkPermiso('inventario', 'crear'), validate(productSchema), productController.create);
router.put('/:id', authMiddleware, checkPermiso('inventario', 'editar'), validate(productSchema), productController.update);
router.delete('/:id', authMiddleware, checkPermiso('inventario', 'eliminar'), productController.remove);

module.exports = router;
