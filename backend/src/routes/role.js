// Rutas para gestión de roles
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { authMiddleware } = require('../controllers/authController');
const checkPermiso = require('../middlewares/checkPermiso');

router.get('/', authMiddleware, checkPermiso('roles', 'leer'), roleController.getRoles);
router.post('/', authMiddleware, checkPermiso('roles', 'crear'), roleController.createRole);
router.put('/:id', authMiddleware, checkPermiso('roles', 'editar'), roleController.updateRole);
router.delete('/:id', authMiddleware, checkPermiso('roles', 'eliminar'), roleController.deleteRole);

module.exports = router;
