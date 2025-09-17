// Modelo real de Categoría para Inventory POS (Mongoose)
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
