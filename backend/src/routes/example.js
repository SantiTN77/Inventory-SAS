const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/exampleController');

// Ejemplo de endpoint modularizado
router.get('/', exampleController.getMessage);

module.exports = router;
