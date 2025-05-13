const express = require('express');
const router = express.Router();


// Importar rutas de módulos aquí
const exampleRoutes = require('./example');
const authRoutes = require('./auth');
const protectedRoutes = require('./protected');
const productRoutes = require('./product');
router.use('/example', exampleRoutes);
router.use('/auth', authRoutes);
router.use('/api/protegido', protectedRoutes);
router.use('/api/productos', productRoutes);

// Ruta raíz
router.get('/', (req, res) => {
  res.send('API Punto SAS funcionando');
});

module.exports = router;
