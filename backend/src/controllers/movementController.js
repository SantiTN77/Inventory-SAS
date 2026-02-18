const Movement = require('../models/movement.mongo');

// Obtener todos los movimientos
exports.getAll = async (req, res) => {
  try {
    const list = await Movement.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener movimientos', error: e.message });
  }
};

// Obtener un movimiento por ID
exports.getById = async (req, res) => {
  try {
    const movement = await Movement.findById(req.params.id);
    if (!movement) return res.status(404).json({ message: 'Movimiento no encontrado' });
    res.json(movement);
  } catch (e) {
    res.status(400).json({ message: 'ID inválido', error: e.message });
  }
};

// Crear un nuevo movimiento
exports.create = async (req, res) => {
  try {
    const { descripcion, tipo, monto } = req.body;
    const m = await Movement.create({ descripcion, tipo, monto });
    res.status(201).json(m);
  } catch (e) {
    res.status(400).json({ message: 'Error al crear movimiento', error: e.message });
  }
};

// Actualizar un movimiento
exports.update = async (req, res) => {
  try {
    const { descripcion, tipo, monto } = req.body;
    const m = await Movement.findByIdAndUpdate(req.params.id, { descripcion, tipo, monto }, { new: true });
    if (!m) return res.status(404).json({ message: 'Movimiento no encontrado' });
    res.json(m);
  } catch (e) {
    res.status(400).json({ message: 'Error al actualizar movimiento', error: e.message });
  }
};

// Eliminar un movimiento
exports.remove = async (req, res) => {
  try {
    const deleted = await Movement.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Movimiento no encontrado' });
    res.json({ message: 'Movimiento eliminado', movimiento: deleted });
  } catch (e) {
    res.status(400).json({ message: 'Error al eliminar movimiento', error: e.message });
  }
};
