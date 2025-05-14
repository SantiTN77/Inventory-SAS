let categories = require('../models/category');

// Obtener todas las categorías
exports.getAll = (req, res) => {
  res.json(categories);
};

// Obtener una categoría por ID
exports.getById = (req, res) => {
  const id = parseInt(req.params.id);
  const category = categories.find(c => c.id === id);
  if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
  res.json(category);
};

// Crear una nueva categoría
exports.create = (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: 'El nombre es obligatorio' });
  }
  const newCategory = {
    id: categories.length ? categories[categories.length - 1].id + 1 : 1,
    nombre
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
};

// Actualizar una categoría
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre } = req.body;
  const category = categories.find(c => c.id === id);
  if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
  if (nombre !== undefined) category.nombre = nombre;
  res.json(category);
};

// Eliminar una categoría
exports.remove = (req, res) => {
  const id = parseInt(req.params.id);
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) return res.status(404).json({ message: 'Categoría no encontrada' });
  const deleted = categories.splice(index, 1);
  res.json({ message: 'Categoría eliminada', categoria: deleted[0] });
};
