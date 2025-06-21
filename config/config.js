const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mi_basededatos');
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = { dbConnection };
