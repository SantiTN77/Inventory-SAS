// Controlador de Roles para Inventory POS
const Role = require('../models/role');

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener roles', error: err.message });
  }
};

exports.createRole = async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear rol', error: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
    res.json(role);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar rol', error: err.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: 'Rol no encontrado' });
    res.json({ message: 'Rol eliminado' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar rol', error: err.message });
  }
};
