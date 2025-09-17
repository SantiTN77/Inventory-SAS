// Modelo de Rol para Inventory POS
const mongoose = require('mongoose');

const permisoSchema = new mongoose.Schema({
  modulo: { type: String, required: true },
  acciones: [{ type: String, enum: ['crear', 'leer', 'editar', 'eliminar'] }]
}, { _id: false });

const roleSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: String,
  permisos: [permisoSchema],
  activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
