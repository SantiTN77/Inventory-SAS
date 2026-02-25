// Rutas para gestión de usuarios (con roles y planes)
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../controllers/authController');
const checkPermiso = require('../middlewares/checkPermiso');
const validate = require('../middlewares/validate');
const { createUserSchema, updateUserSchema } = require('../validations/user');

router.get('/', authMiddleware, checkPermiso('usuarios', 'leer'), userController.getUsers);
router.post('/', authMiddleware, checkPermiso('usuarios', 'crear'), validate(createUserSchema), userController.createUser);
router.put('/:id', authMiddleware, checkPermiso('usuarios', 'editar'), validate(updateUserSchema), userController.updateUser);
router.delete('/:id', authMiddleware, checkPermiso('usuarios', 'eliminar'), userController.deleteUser);

module.exports = router;
