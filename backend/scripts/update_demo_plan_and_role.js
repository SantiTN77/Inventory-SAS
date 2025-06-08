// Script para actualizar el plan y rol del usuario demo y asegurar acceso a todos los módulos
const mongoose = require('mongoose');
const User = require('../src/models/user.mongo');
const Plan = require('../src/models/plan');
const Role = require('../src/models/role');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://SantiTN77:yzE3PjW9OvQQZzgP@inventory.syl4zsc.mongodb.net/?retryWrites=true&w=majority&appName=INVENTORY';

async function main() {
  await mongoose.connect(MONGODB_URI);

  // 1. Actualizar plan demo para incluir todos los módulos
  const modulos = ['inventario', 'categorias', 'contabilidad', 'proveedores', 'reportes', 'roles'];
  let plan = await Plan.findOneAndUpdate(
    { nombre: /empresarial/i },
    { $set: { modulos } },
    { new: true }
  );
  if (!plan) {
    plan = await Plan.create({
      nombre: 'Empresarial',
      descripcion: 'Plan empresarial con acceso total',
      modulos,
      beneficios: ['soporte 24/7', 'acceso a betas', 'funciones premium'],
      nivel: 'empresarial',
      activo: true
    });
  }

  // 2. Actualizar rol admin demo para incluir permisos completos
  const permisos = modulos.map(m => ({ modulo: m, acciones: ['leer', 'crear', 'editar', 'eliminar'] }));
  let rol = await Role.findOneAndUpdate(
    { nombre: /admin/i },
    { $set: { permisos } },
    { new: true }
  );
  if (!rol) {
    rol = await Role.create({
      nombre: 'admin',
      descripcion: 'Administrador con acceso total',
      permisos,
      activo: true
    });
  }

  // 3. Actualizar usuario demo para usar el plan y rol correctos
  await User.findOneAndUpdate(
    { email: 'demo@email.com' },
    { $set: { plan: plan._id, rol: rol._id, activo: true } }
  );

  console.log('Plan, rol y usuario demo actualizados correctamente.');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
