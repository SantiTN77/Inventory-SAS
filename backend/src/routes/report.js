const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authMiddleware } = require('../controllers/authController');
const checkPermiso = require('../middlewares/checkPermiso');

// Endpoints de reportes protegidos
router.get('/ventas', authMiddleware, checkPermiso('reportes', 'leer'), reportController.getSalesReport);
router.get('/inventario', authMiddleware, checkPermiso('reportes', 'leer'), reportController.getInventoryReport);
router.get('/movimientos', authMiddleware, checkPermiso('reportes', 'leer'), reportController.getMovementsReport);

module.exports = router;
