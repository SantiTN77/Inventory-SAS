const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.mongo');

// Login usando Mongoose y bcrypt, with sanitised error responses
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
    const token = jwt.sign(
      { id: user._id, rol: user.rol.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    // Return role and plan without sensitive internals
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
    res.json({ token, user: { id: user._id, nombre: user.nombre, email: user.email, rol, plan } });
  } catch (err) {
    // Never expose internal error details to the client
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Auth middleware — verifies JWT and attaches decoded payload to req.user
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado, por favor inicia sesión de nuevo' });
    }
    return res.status(403).json({ message: 'Token inválido' });
  }
};
