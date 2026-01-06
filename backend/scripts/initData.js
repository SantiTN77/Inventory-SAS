/**
 * Script de inicialización de datos para Inventory-SAS
 * Ejecutar con: node scripts/initData.js
 * 
 * Este script crea:
 * - Roles básicos (admin, usuario, contador)
 * - Planes básicos (empresarial, básico, negocio, contable)
 * - Usuario administrador por defecto
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Role = require('../src/models/role');
const Plan = require('../src/models/plan');
const User = require('../src/models/user.mongo');

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('❌ Error: MONGODB_URI no está definido en .env');
  process.exit(1);
}

async function initData() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado a MongoDB\n');

    // 1. Crear Roles
    console.log('📝 Creando roles...');
    const roles = [
      {
        nombre: 'admin',
        descripcion: 'Administrador con acceso completo al sistema',
        permisos: [
          { modulo: 'inventario', acciones: ['crear', 'leer', 'editar', 'eliminar'] },
          { modulo: 'categorias', acciones: ['crear', 'leer', 'editar', 'eliminar'] },
          { modulo: 'proveedores', acciones: ['crear', 'leer', 'editar', 'eliminar'] },
          { modulo: 'contabilidad', acciones: ['crear', 'leer', 'editar', 'eliminar'] },
          { modulo: 'roles', acciones: ['crear', 'leer', 'editar', 'eliminar'] },
          { modulo: 'usuarios', acciones: ['crear', 'leer', 'editar', 'eliminar'] },
          { modulo: 'reportes', acciones: ['crear', 'leer', 'editar', 'eliminar'] },
        ],
        activo: true
      },
      {
        nombre: 'usuario',
        descripcion: 'Usuario estándar con acceso limitado',
        permisos: [
          { modulo: 'inventario', acciones: ['leer'] },
          { modulo: 'categorias', acciones: ['leer'] },
        ],
        activo: true
      },
      {
        nombre: 'contador',
        descripcion: 'Contador con acceso a módulos financieros',
        permisos: [
          { modulo: 'inventario', acciones: ['leer'] },
          { modulo: 'contabilidad', acciones: ['crear', 'leer', 'editar'] },
          { modulo: 'reportes', acciones: ['leer'] },
        ],
        activo: true
      }
    ];

    const createdRoles = {};
    for (const roleData of roles) {
      let role = await Role.findOne({ nombre: roleData.nombre });
      if (role) {
        console.log(`   ⚠️  Rol "${roleData.nombre}" ya existe, actualizando...`);
        Object.assign(role, roleData);
        await role.save();
      } else {
        role = await Role.create(roleData);
        console.log(`   ✅ Rol "${roleData.nombre}" creado`);
      }
      createdRoles[roleData.nombre] = role;
    }

    // 2. Crear Planes
    console.log('\n📦 Creando planes...');
    const plans = [
      {
        nombre: 'Empresarial',
        descripcion: 'Plan completo con todos los módulos y funcionalidades',
        modulos: ['inventario', 'categorias', 'proveedores', 'contabilidad', 'roles', 'usuarios', 'reportes', 'estadisticas'],
        beneficios: ['Soporte 24/7', 'Acceso a todas las funciones', 'Actualizaciones prioritarias'],
        nivel: 'empresarial',
        activo: true
      },
      {
        nombre: 'Básico',
        descripcion: 'Plan básico para pequeños negocios',
        modulos: ['inventario', 'categorias'],
        beneficios: ['Soporte por email', 'Funciones esenciales'],
        nivel: 'basico',
        activo: true
      },
      {
        nombre: 'Negocio',
        descripcion: 'Plan para negocios en crecimiento',
        modulos: ['inventario', 'categorias', 'proveedores', 'reportes'],
        beneficios: ['Soporte prioritario', 'Funciones avanzadas'],
        nivel: 'negocio',
        activo: true
      },
      {
        nombre: 'Contable',
        descripcion: 'Plan enfocado en contabilidad',
        modulos: ['inventario', 'categorias', 'contabilidad', 'reportes'],
        beneficios: ['Soporte especializado', 'Módulos contables'],
        nivel: 'contable',
        activo: true
      }
    ];

    const createdPlans = {};
    for (const planData of plans) {
      let plan = await Plan.findOne({ nombre: planData.nombre });
      if (plan) {
        console.log(`   ⚠️  Plan "${planData.nombre}" ya existe, actualizando...`);
        Object.assign(plan, planData);
        await plan.save();
      } else {
        plan = await Plan.create(planData);
        console.log(`   ✅ Plan "${planData.nombre}" creado`);
      }
      createdPlans[planData.nombre] = plan;
    }

    // 3. Crear Usuario Administrador
    console.log('\n👤 Creando usuario administrador...');
    const adminEmail = 'demo@email.com';
    const adminPassword = 'demo123';
    
    let adminUser = await User.findOne({ email: adminEmail });
    if (adminUser) {
      console.log(`   ⚠️  Usuario "${adminEmail}" ya existe, actualizando...`);
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      adminUser.password = hashedPassword;
      adminUser.rol = createdRoles['admin']._id;
      adminUser.plan = createdPlans['Empresarial']._id;
      adminUser.activo = true;
      await adminUser.save();
      console.log(`   ✅ Usuario "${adminEmail}" actualizado`);
    } else {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      adminUser = await User.create({
        nombre: 'Usuario Demo',
        email: adminEmail,
        password: hashedPassword,
        rol: createdRoles['admin']._id,
        plan: createdPlans['Empresarial']._id,
        activo: true
      });
      console.log(`   ✅ Usuario "${adminEmail}" creado`);
    }

    console.log('\n✅ Inicialización completada exitosamente!');
    console.log('\n📋 Credenciales de acceso:');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log('\n💡 Puedes usar estas credenciales para iniciar sesión en la aplicación.\n');

  } catch (error) {
    console.error('❌ Error durante la inicialización:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión a MongoDB cerrada');
  }
}

// Ejecutar
initData()
  .then(() => {
    console.log('✨ Proceso finalizado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });

