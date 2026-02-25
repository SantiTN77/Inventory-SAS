// Controlador de Usuarios para Inventory POS (con roles y planes)
const bcrypt = require('bcryptjs');
const User = require('../models/user.mongo');
const Role = require('../models/role');
const Plan = require('../models/plan');

/** Fields to exclude from user responses (never send password hashes to clients) */
const SAFE_SELECT = '-password';

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select(SAFE_SELECT).populate('rol').populate('plan');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nombre, email, password, rol, plan } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ nombre, email, password: hashedPassword, rol, plan });
    await user.save();
    // Return user without password
    const safeUser = user.toObject();
    delete safeUser.password;
    res.status(201).json(safeUser);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear usuario', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };
    // Only hash if a new plaintext password is provided; reject already-hashed values
    if (updateData.password) {
      if (updateData.password.startsWith('$2a$') || updateData.password.startsWith('$2b$')) {
        // Already a bcrypt hash — do not re-hash, strip it to prevent write-back
        delete updateData.password;
      } else {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .select(SAFE_SELECT);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar usuario', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar usuario', error: err.message });
  }
};
