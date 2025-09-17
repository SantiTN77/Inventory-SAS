const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  stock: { type: Number, required: true, min: 0, default: 0 },
  precio: { type: Number, required: true, min: 0, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

