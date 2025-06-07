// Rutas para gestión de planes
const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

// TODO: Proteger con middleware de permisos/roles (solo admin)
router.get('/', planController.getPlanes);
router.post('/', planController.createPlan);
router.put('/:id', planController.updatePlan);
router.delete('/:id', planController.deletePlan);

module.exports = router;
