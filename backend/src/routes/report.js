const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authMiddleware } = require('../controllers/authController');

// Endpoints de reportes protegidos
router.get('/ventas', authMiddleware, reportController.getSalesReport);
router.get('/inventario', authMiddleware, reportController.getInventoryReport);
router.get('/movimientos', authMiddleware, reportController.getMovementsReport);

module.exports = router;
