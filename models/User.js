const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: { type: [String], default: [] } // Para almacenar tokens de sesión
});

module.exports = mongoose.model('User', UserSchema);
