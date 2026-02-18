const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const { authMiddleware } = require('../controllers/authController');
const checkPermiso = require('../middlewares/checkPermiso');
const validate = require('../middlewares/validate');
const { providerSchema } = require('../models/schemas');

// Todas las rutas protegidas por autenticación
router.get('/', authMiddleware, checkPermiso('proveedores', 'leer'), providerController.getAll);
router.get('/:id', authMiddleware, checkPermiso('proveedores', 'leer'), providerController.getById);
router.post('/', authMiddleware, checkPermiso('proveedores', 'crear'), validate(providerSchema), providerController.create);
router.put('/:id', authMiddleware, checkPermiso('proveedores', 'editar'), validate(providerSchema), providerController.update);
router.delete('/:id', authMiddleware, checkPermiso('proveedores', 'eliminar'), providerController.remove);

module.exports = router;
