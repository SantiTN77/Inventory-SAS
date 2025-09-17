const Product = require('../models/product.mongo');

// Obtener todos los productos
exports.getAll = async (req, res) => {
  try {
    const list = await Product.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener productos', error: e.message });
  }
};

// Obtener un producto por ID
exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: 'ID inválido', error: e.message });
  }
};

// Crear un nuevo producto
exports.create = async (req, res) => {
  try {
    const { nombre, stock, precio } = req.body;
    const p = await Product.create({ nombre, stock, precio });
    res.status(201).json(p);
  } catch (e) {
    res.status(400).json({ message: 'Error al crear producto', error: e.message });
  }
};

// Actualizar un producto
exports.update = async (req, res) => {
  try {
    const { nombre, stock, precio } = req.body;
    const p = await Product.findByIdAndUpdate(req.params.id, { nombre, stock, precio }, { new: true });
    if (!p) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(p);
  } catch (e) {
    res.status(400).json({ message: 'Error al actualizar producto', error: e.message });
  }
};

// Eliminar un producto
exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado', producto: deleted });
  } catch (e) {
    res.status(400).json({ message: 'Error al eliminar producto', error: e.message });
  }
};
