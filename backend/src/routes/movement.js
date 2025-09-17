const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');
const { authMiddleware } = require('../controllers/authController');
const checkPermiso = require('../middlewares/checkPermiso');
const validate = require('../middlewares/validate');
const { movementSchema } = require('../models/schemas');

// Todas las rutas protegidas por autenticación
router.get('/', authMiddleware, checkPermiso('contabilidad', 'leer'), movementController.getAll);
router.get('/:id', authMiddleware, checkPermiso('contabilidad', 'leer'), movementController.getById);
router.post('/', authMiddleware, checkPermiso('contabilidad', 'crear'), validate(movementSchema), movementController.create);
router.put('/:id', authMiddleware, checkPermiso('contabilidad', 'editar'), validate(movementSchema), movementController.update);
router.delete('/:id', authMiddleware, checkPermiso('contabilidad', 'eliminar'), movementController.remove);

module.exports = router;
