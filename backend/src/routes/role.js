// Rutas para gestión de roles
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// TODO: Proteger con middleware de permisos/roles (solo admin)
router.get('/', roleController.getRoles);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;
