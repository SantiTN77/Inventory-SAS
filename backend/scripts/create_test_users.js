// Script para crear usuarios de ejemplo con diferentes planes y roles
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/user.mongo');
const Plan = require('../src/models/plan');
const Role = require('../src/models/role');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://SantiTN77:yzE3PjW9OvQQZzgP@inventory.syl4zsc.mongodb.net/?retryWrites=true&w=majority&appName=INVENTORY';

async function main() {
  await mongoose.connect(MONGODB_URI);

  // Buscar planes y roles existentes
  // Solo dos tipos: admin (demo) y cajero (negocio)
  const planCajero = await Plan.findOne({ nivel: 'negocio' }) || await Plan.create({ nombre: 'Negocio', descripcion: 'Plan para cajero', modulos: ['inventario', 'contabilidad'], beneficios: [], nivel: 'negocio', activo: true });

  // Rol cajero: puede leer inventario y contabilidad, pero no editar/crear/eliminar en inventario
  const rolCajero = await Role.findOneAndUpdate(
    { nombre: 'cajero' },
    {
      nombre: 'cajero',
      descripcion: 'Cajero punto de venta',
      permisos: [
        { modulo: 'inventario', acciones: ['leer'] },
        { modulo: 'contabilidad', acciones: ['leer'] }
      ],
      activo: true
    },
    { upsert: true, new: true }
  );

  // Usuario demo admin ya existe y se actualiza con el otro script
  const users = [
    {
      nombre: 'Cajero Negocio',
      email: 'negocio@email.com',
      password: 'negocio123',
      rol: rolCajero._id,
      plan: planCajero._id
    }
  ];

  for (const u of users) {
    const exists = await User.findOne({ email: u.email });
    if (!exists) {
      const hash = await bcrypt.hash(u.password, 10);
      await User.create({ ...u, password: hash });
      console.log(`Usuario creado: ${u.email} / ${u.password}`);
    } else {
      console.log(`Usuario ya existe: ${u.email}`);
    }
  }

  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
