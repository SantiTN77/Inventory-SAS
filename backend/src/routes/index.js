const express = require('express');
const router = express.Router();


// Importar rutas de módulos aquí
const exampleRoutes = require('./example');
const authRoutes = require('./auth');
const protectedRoutes = require('./protected');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const providerRoutes = require('./provider');
const movementRoutes = require('./movement');

const planRoutes = require('./plan');
const roleRoutes = require('./role');
const userRoutes = require('./user');
const reportRoutes = require('./report');
router.use('/example', exampleRoutes);
router.use('/auth', authRoutes);
router.use('/api/protegido', protectedRoutes);
router.use('/api/productos', productRoutes);
router.use('/api/categorias', categoryRoutes);
router.use('/api/proveedores', providerRoutes);
router.use('/api/movimientos', movementRoutes);
router.use('/api/reportes', reportRoutes);
router.use('/api/planes', planRoutes);
router.use('/api/roles', roleRoutes);
router.use('/api/usuarios', userRoutes);

// Ruta raíz
router.get('/', (req, res) => {
  res.send('API Punto SAS funcionando');
});

module.exports = router;
