use('inventory');

// Listar todos los roles existentes
const roles = db.getCollection('roles').find().toArray();
console.log('Roles actuales:', roles);

// Listar todos los usuarios existentes
const users = db.getCollection('users').find().toArray();
console.log('Usuarios actuales:', users);