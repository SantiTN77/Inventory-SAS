// Modelo de usuario para autenticación y roles
const users = [
  {
    id: 1,
    nombre: 'Admin',
    email: 'admin@demo.com',
    password: '$2b$10$hashdemopassword', // Simulado, usar bcrypt en real
    rol: 'admin',
  },
];

module.exports = users;
