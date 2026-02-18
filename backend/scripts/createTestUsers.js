/**
 * Script para crear usuarios de prueba con diferentes roles
 * Ejecutar con: node scripts/createTestUsers.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/user.mongo');
const Role = require('../src/models/role');
const Plan = require('../src/models/plan');

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('❌ Error: MONGODB_URI no está definido en .env');
  process.exit(1);
}

async function createTestUsers() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado a MongoDB\n');

    // Obtener roles y planes
    const adminRole = await Role.findOne({ nombre: 'admin' });
    const usuarioRole = await Role.findOne({ nombre: 'usuario' });
    const contadorRole = await Role.findOne({ nombre: 'contador' });

    const planEmpresarial = await Plan.findOne({ nombre: 'Empresarial' });
    const planBasico = await Plan.findOne({ nombre: 'Básico' });
    const planNegocio = await Plan.findOne({ nombre: 'Negocio' });
    const planContable = await Plan.findOne({ nombre: 'Contable' });

    if (!adminRole || !usuarioRole || !contadorRole) {
      console.error('❌ Error: Roles no encontrados. Ejecuta primero initData.js');
      process.exit(1);
    }

    // Usuarios de prueba
    const testUsers = [
      {
        nombre: 'Usuario Estándar',
        email: 'usuario@test.com',
        password: 'usuario123',
        rol: usuarioRole,
        plan: planBasico,
        descripcion: 'Usuario con permisos limitados - Solo lectura en inventario y categorías'
      },
      {
        nombre: 'Contador Test',
        email: 'contador@test.com',
        password: 'contador123',
        rol: contadorRole,
        plan: planContable,
        descripcion: 'Contador con acceso a módulos financieros - Lectura en inventario, CRUD en contabilidad'
      },
      {
        nombre: 'Admin Test',
        email: 'admin@test.com',
        password: 'admin123',
        rol: adminRole,
        plan: planEmpresarial,
        descripcion: 'Administrador con acceso completo'
      },
      {
        nombre: 'Usuario Negocio',
        email: 'negocio@test.com',
        password: 'negocio123',
        rol: usuarioRole,
        plan: planNegocio,
        descripcion: 'Usuario con plan Negocio - Acceso a inventario, categorías, proveedores y reportes'
      }
    ];

    console.log('👤 Creando usuarios de prueba...\n');

    for (const userData of testUsers) {
      let user = await User.findOne({ email: userData.email });
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      if (user) {
        console.log(`   ⚠️  Usuario "${userData.email}" ya existe, actualizando...`);
        user.nombre = userData.nombre;
        user.password = hashedPassword;
        user.rol = userData.rol._id;
        user.plan = userData.plan._id;
        user.activo = true;
        await user.save();
      } else {
        user = await User.create({
          nombre: userData.nombre,
          email: userData.email,
          password: hashedPassword,
          rol: userData.rol._id,
          plan: userData.plan._id,
          activo: true
        });
      }

      console.log(`   ✅ Usuario: ${userData.email}`);
      console.log(`      Password: ${userData.password}`);
      console.log(`      Rol: ${userData.rol.nombre}`);
      console.log(`      Plan: ${userData.plan.nombre}`);
      console.log(`      ${userData.descripcion}\n`);
    }

    console.log('✅ Usuarios de prueba creados exitosamente!\n');
    console.log('📋 RESUMEN DE CREDENCIALES:\n');
    console.log('═'.repeat(60));
    testUsers.forEach(u => {
      console.log(`\n📧 ${u.email}`);
      console.log(`   🔑 Password: ${u.password}`);
      console.log(`   👤 Rol: ${u.rol.nombre}`);
      console.log(`   📦 Plan: ${u.plan.nombre}`);
    });
    console.log('\n' + '═'.repeat(60));
    console.log('\n💡 Usa estas credenciales para probar diferentes niveles de permisos.\n');

  } catch (error) {
    console.error('❌ Error durante la creación de usuarios:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Conexión a MongoDB cerrada');
  }
}

// Ejecutar
createTestUsers()
  .then(() => {
    console.log('✨ Proceso finalizado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });

