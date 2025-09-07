const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    genero: String,
    resumen: String,
    portadaUrl: String,
    ISBN: String,
}, { timestamps: true });

module.exports = mongoose.model('Libro', libroSchema);