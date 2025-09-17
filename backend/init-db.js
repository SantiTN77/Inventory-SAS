
// Script de inicialización profesional para Inventory-SAS
// Crea datos de ejemplo en MongoDB para desarrollo y pruebas
require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

// Definir esquemas Mongoose
const userSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String,
  rol: String,
});
const categorySchema = new mongoose.Schema({ nombre: String });
const productSchema = new mongoose.Schema({ nombre: String, stock: Number, precio: Number });
const providerSchema = new mongoose.Schema({ nombre: String, contacto: String });
const movementSchema = new mongoose.Schema({ descripcion: String, tipo: String, monto: Number });

const User = mongoose.model('User', userSchema);
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);
const Provider = mongoose.model('Provider', providerSchema);
const Movement = mongoose.model('Movement', movementSchema);

async function initDB() {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Conectado a MongoDB para inicialización.');

  // Limpiar datos previos SOLO en desarrollo
  await User.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});
  await Provider.deleteMany({});
  await Movement.deleteMany({});

  // Insertar datos de ejemplo
  const admin = await User.create({
    nombre: 'Admin',
    email: 'admin@demo.com',
    password: '$2b$10$hashdemopassword', // Simulado, usar bcrypt real en producción
    rol: 'admin',
  });
  const category = await Category.create({ nombre: 'General' });
  const provider = await Provider.create({ nombre: 'Proveedor General', contacto: 'contacto@proveedor.com' });
  const product = await Product.create({ nombre: 'Ejemplo producto', stock: 20, precio: 100.00 });
  const movement = await Movement.create({ descripcion: 'Venta producto', tipo: 'Ingreso', monto: 500.00 });

  console.log('Datos de ejemplo insertados correctamente.');
  await mongoose.disconnect();
}

initDB().catch(err => {
  console.error('Error inicializando la base de datos:', err);
  process.exit(1);
});
