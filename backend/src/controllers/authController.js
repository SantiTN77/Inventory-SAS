const jwt = require('jsonwebtoken');
const users = require('../models/user');

// Simulación de login (en real, usar bcrypt y base de datos)
exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && password === 'demo123'); // Simulación
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET || 'secret', { expiresIn: '2h' });
  res.json({ token, user: { id: user.id, nombre: user.nombre, rol: user.rol } });
};

// Middleware de protección de rutas
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });
  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};
