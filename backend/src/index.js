require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// Conexión a MongoDB
const mongoose = require('mongoose');
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri || typeof mongoUri !== 'string') {
  console.error('Error: MONGODB_URI no está definido. Revisa backend/.env');
  process.exit(1);
}
mongoose.connect(mongoUri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err.message);
    process.exit(1);
  });

// Importar rutas principales
const routes = require('./routes');
app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
