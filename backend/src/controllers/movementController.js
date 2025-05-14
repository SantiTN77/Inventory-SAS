let movements = require('../models/movement');

// Obtener todos los movimientos
exports.getAll = (req, res) => {
  res.json(movements);
};

// Obtener un movimiento por ID
exports.getById = (req, res) => {
  const id = parseInt(req.params.id);
  const movement = movements.find(m => m.id === id);
  if (!movement) return res.status(404).json({ message: 'Movimiento no encontrado' });
  res.json(movement);
};

// Crear un nuevo movimiento
exports.create = (req, res) => {
  const { descripcion, tipo, monto } = req.body;
  if (!descripcion || !tipo || monto == null) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  const newMovement = {
    id: movements.length ? movements[movements.length - 1].id + 1 : 1,
    descripcion,
    tipo,
    monto
  };
  movements.push(newMovement);
  res.status(201).json(newMovement);
};

// Actualizar un movimiento
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const { descripcion, tipo, monto } = req.body;
  const movement = movements.find(m => m.id === id);
  if (!movement) return res.status(404).json({ message: 'Movimiento no encontrado' });
  if (descripcion !== undefined) movement.descripcion = descripcion;
  if (tipo !== undefined) movement.tipo = tipo;
  if (monto !== undefined) movement.monto = monto;
  res.json(movement);
};

// Eliminar un movimiento
exports.remove = (req, res) => {
  const id = parseInt(req.params.id);
  const index = movements.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ message: 'Movimiento no encontrado' });
  const deleted = movements.splice(index, 1);
  res.json({ message: 'Movimiento eliminado', movimiento: deleted[0] });
};
