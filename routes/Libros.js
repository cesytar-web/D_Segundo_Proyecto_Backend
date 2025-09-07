const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');

// Crear un nuevo libro
router.post('/', async(req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        const libroGuardado = await nuevoLibro.save();
        res.status(201).json(libroGuardado);
    } catch (error) {
        console.error('Error al guardar libro:', error);
        res.status(500).json({ mensaje: 'Error al guardar el libro' });
    }
});

module.exports = router;