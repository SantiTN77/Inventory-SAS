const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.mongo');

// Login real usando Mongoose y bcrypt
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate('rol').populate('plan');
    if (!user || !user.activo) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    // Token válido por 7 días para evitar cierres de sesión frecuentes
    const token = jwt.sign({ id: user._id, rol: user.rol.nombre }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // Enviar el objeto rol y plan completos (sin campos sensibles)
    const rol = user.rol ? {
      nombre: user.rol.nombre,
      descripcion: user.rol.descripcion,
      permisos: user.rol.permisos
    } : null;
    const plan = user.plan ? {
      nombre: user.plan.nombre,
      descripcion: user.plan.descripcion,
      modulos: user.plan.modulos
    } : null;
    res.json({ token, user: { id: user._id, nombre: user.nombre, rol, plan } });
  } catch (err) {
    res.status(500).json({ message: 'Error en login', error: err.message });
  }
};

// Middleware de protección de rutas
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};
