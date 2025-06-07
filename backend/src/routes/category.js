const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authMiddleware } = require('../controllers/authController');
const checkPermiso = require('../middlewares/checkPermiso');
const validate = require('../middlewares/validate');
const { categorySchema } = require('../models/schemas');

// Todas las rutas protegidas por autenticación
router.get('/', authMiddleware, checkPermiso('categorias', 'leer'), categoryController.getAll);
router.get('/:id', authMiddleware, checkPermiso('categorias', 'leer'), categoryController.getById);
router.post('/', authMiddleware, checkPermiso('categorias', 'crear'), validate(categorySchema), categoryController.create);
router.put('/:id', authMiddleware, checkPermiso('categorias', 'editar'), validate(categorySchema), categoryController.update);
router.delete('/:id', authMiddleware, checkPermiso('categorias', 'eliminar'), categoryController.remove);

module.exports = router;
