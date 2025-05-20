let products = require('../models/product');

// Obtener todos los productos
exports.getAll = (req, res) => {
  res.json({ products });
};

// Obtener un producto por ID
exports.getById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  res.json(product);
};

// Crear un nuevo producto
exports.create = (req, res) => {
  const { nombre, stock, precio } = req.body;
  if (!nombre || stock == null || precio == null) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    nombre,
    stock,
    precio
  };
  products.push(newProduct);
  res.status(201).json({ product: newProduct, products });
};

// Actualizar un producto
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, stock, precio } = req.body;
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
  if (nombre !== undefined) product.nombre = nombre;
  if (stock !== undefined) product.stock = stock;
  if (precio !== undefined) product.precio = precio;
  res.json({ product, products });
};

// Eliminar un producto
exports.remove = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' });
  const deleted = products.splice(index, 1);
  res.json({ message: 'Producto eliminado', producto: deleted[0], products });
};
