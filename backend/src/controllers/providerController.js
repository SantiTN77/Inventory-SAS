const Provider = require('../models/provider.mongo');

// Obtener todos los proveedores
exports.getAll = async (req, res) => {
  try {
    const list = await Provider.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener proveedores', error: e.message });
  }
};

// Obtener un proveedor por ID
exports.getById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(provider);
  } catch (e) {
    res.status(400).json({ message: 'ID inválido', error: e.message });
  }
};

// Crear un nuevo proveedor
exports.create = async (req, res) => {
  try {
    const { nombre, contacto } = req.body;
    const p = await Provider.create({ nombre, contacto });
    res.status(201).json(p);
  } catch (e) {
    res.status(400).json({ message: 'Error al crear proveedor', error: e.message });
  }
};

// Actualizar un proveedor
exports.update = async (req, res) => {
  try {
    const { nombre, contacto } = req.body;
    const p = await Provider.findByIdAndUpdate(req.params.id, { nombre, contacto }, { new: true });
    if (!p) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(p);
  } catch (e) {
    res.status(400).json({ message: 'Error al actualizar proveedor', error: e.message });
  }
};

// Eliminar un proveedor
exports.remove = async (req, res) => {
  try {
    const deleted = await Provider.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json({ message: 'Proveedor eliminado', proveedor: deleted });
  } catch (e) {
    res.status(400).json({ message: 'Error al eliminar proveedor', error: e.message });
  }
};
