// Rutas para gestión de planes
const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const { authMiddleware } = require('../controllers/authController');
const checkPermiso = require('../middlewares/checkPermiso');

router.get('/', authMiddleware, checkPermiso('planes', 'leer'), planController.getPlanes);
router.post('/', authMiddleware, checkPermiso('planes', 'crear'), planController.createPlan);
router.put('/:id', authMiddleware, checkPermiso('planes', 'editar'), planController.updatePlan);
router.delete('/:id', authMiddleware, checkPermiso('planes', 'eliminar'), planController.deletePlan);

module.exports = router;
