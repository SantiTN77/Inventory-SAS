const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
  descripcion: { type: String, required: true, trim: true },
  tipo: { type: String, enum: ['Ingreso', 'Egreso'], required: true },
  monto: { type: Number, required: true, min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Movement', movementSchema);

