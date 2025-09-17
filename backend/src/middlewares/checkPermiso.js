// Middleware de permisos para Inventory POS
const jwt = require('jsonwebtoken');
const User = require('../models/user.mongo');
const Role = require('../models/role');
const Plan = require('../models/plan');

/**
 * Middleware para verificar permisos de usuario según módulo y acción
 * @param {string} modulo - Nombre del módulo (ej: 'inventario')
 * @param {string} accion - Acción requerida (ej: 'crear', 'leer', 'editar', 'eliminar')
 */
function checkPermiso(modulo, accion) {
  return async function (req, res, next) {
    try {
      const auth = req.headers.authorization;
      if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado' });
      }
      const token = auth.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).populate('rol').populate('plan');
      if (!user || !user.activo) {
        return res.status(401).json({ message: 'Usuario no válido o inactivo' });
      }
      // Verificar si el módulo está habilitado en el plan
      if (!user.plan.modulos.includes(modulo)) {
        return res.status(403).json({ message: 'Este módulo no está habilitado en tu plan' });
      }
      // Verificar si el rol tiene permiso para la acción en el módulo
      const permiso = user.rol.permisos.find(p => p.modulo === modulo);
      if (!permiso || !permiso.acciones.includes(accion)) {
        return res.status(403).json({ message: 'No tienes permiso para esta acción' });
      }
      req.user = user; // Adjuntar usuario al request para uso posterior
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token inválido o expirado', error: err.message });
    }
  };
}

module.exports = checkPermiso;
