const express = require('express');
const router = express.Router();

// Importar rutas de módulos aquí
const exampleRoutes = require('./example');
router.use('/example', exampleRoutes);

// Ruta raíz
router.get('/', (req, res) => {
  res.send('API Punto SAS funcionando');
});

module.exports = router;
