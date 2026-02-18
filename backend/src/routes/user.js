// Rutas para gestión de usuarios (con roles y planes)
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../controllers/authController');
const checkPermiso = require('../middlewares/checkPermiso');

router.get('/', authMiddleware, checkPermiso('usuarios', 'leer'), userController.getUsers);
router.post('/', authMiddleware, checkPermiso('usuarios', 'crear'), userController.createUser);
router.put('/:id', authMiddleware, checkPermiso('usuarios', 'editar'), userController.updateUser);
router.delete('/:id', authMiddleware, checkPermiso('usuarios', 'eliminar'), userController.deleteUser);

module.exports = router;
