const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const { authMiddleware } = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { providerSchema } = require('../models/schemas');

// Todas las rutas protegidas por autenticación
router.get('/', authMiddleware, providerController.getAll);
router.get('/:id', authMiddleware, providerController.getById);
router.post('/', authMiddleware, validate(providerSchema), providerController.create);
router.put('/:id', authMiddleware, validate(providerSchema), providerController.update);
router.delete('/:id', authMiddleware, providerController.remove);

module.exports = router;
