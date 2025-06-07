// Modelo de Plan para Inventory POS
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: String,
  modulos: [String], // Ej: ['inventario', 'categorias', 'proveedores', ...]
  beneficios: [{ type: String }], // Ej: ['soporte 24/7', 'acceso a betas', 'funciones premium']
  nivel: { type: String, enum: ['basico', 'negocio', 'contable', 'empresarial'], required: true },
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
