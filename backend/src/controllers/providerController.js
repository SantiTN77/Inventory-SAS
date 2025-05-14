let providers = require('../models/provider');

// Obtener todos los proveedores
exports.getAll = (req, res) => {
  res.json(providers);
};

// Obtener un proveedor por ID
exports.getById = (req, res) => {
  const id = parseInt(req.params.id);
  const provider = providers.find(p => p.id === id);
  if (!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });
  res.json(provider);
};

// Crear un nuevo proveedor
exports.create = (req, res) => {
  const { nombre, contacto } = req.body;
  if (!nombre || !contacto) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  const newProvider = {
    id: providers.length ? providers[providers.length - 1].id + 1 : 1,
    nombre,
    contacto
  };
  providers.push(newProvider);
  res.status(201).json(newProvider);
};

// Actualizar un proveedor
exports.update = (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, contacto } = req.body;
  const provider = providers.find(p => p.id === id);
  if (!provider) return res.status(404).json({ message: 'Proveedor no encontrado' });
  if (nombre !== undefined) provider.nombre = nombre;
  if (contacto !== undefined) provider.contacto = contacto;
  res.json(provider);
};

// Eliminar un proveedor
exports.remove = (req, res) => {
  const id = parseInt(req.params.id);
  const index = providers.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ message: 'Proveedor no encontrado' });
  const deleted = providers.splice(index, 1);
  res.json({ message: 'Proveedor eliminado', proveedor: deleted[0] });
};
