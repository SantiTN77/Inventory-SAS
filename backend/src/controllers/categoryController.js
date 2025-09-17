
const Category = require('../models/category.mongo');


// Obtener todas las categorías desde MongoDB
exports.getAll = async (req, res) => {
  try {
    const categorias = await Category.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener categorías', error: err.message });
  }
};


// Obtener una categoría por ID (MongoDB)
exports.getById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: 'ID inválido', error: err.message });
  }
};


// Crear una nueva categoría en MongoDB
exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ message: 'El nombre es obligatorio' });
    const exists = await Category.findOne({ nombre });
    if (exists) return res.status(409).json({ message: 'La categoría ya existe' });
    const newCategory = new Category({ nombre });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear categoría', error: err.message });
  }
};


// Actualizar una categoría en MongoDB
exports.update = async (req, res) => {
  try {
    const { nombre } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, { nombre }, { new: true });
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar categoría', error: err.message });
  }
};


// Eliminar una categoría en MongoDB
exports.remove = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada', categoria: category });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar categoría', error: err.message });
  }
};
