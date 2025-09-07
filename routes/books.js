const express = require('express');
const router = express.Router();

// Aquí simulamos una base de datos en memoria para simplificar (puedes conectar la DB real)
let books = [{
        id: '1',
        title: 'Cien años de soledad',
        author: 'Gabriel García Márquez',
        genre: 'Realismo mágico',
        description: 'Una novela sobre la familia Buendía y la aldea ficticia de Macondo.',
        coverUrl: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
    },
    {
        id: '2',
        title: 'Don Quijote de la Mancha',
        author: 'Miguel de Cervantes',
        genre: 'Novela clásica',
        description: 'La historia de un hidalgo que se vuelve caballero andante.',
        coverUrl: 'https://covers.openlibrary.org/b/id/8315076-L.jpg',
    }
];

// GET /books - listar libros
router.get('/', (req, res) => {
    res.json(books);
});

// POST /books - agregar libro
router.post('/', (req, res) => {
    const newBook = { id: Date.now().toString(), ...req.body };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id - actualizar libro
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return res.status(404).json({ error: 'Libro no encontrado' });

    books[index] = { id, ...req.body };
    res.json(books[index]);
});

// DELETE /books/:id - eliminar libro
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return res.status(404).json({ error: 'Libro no encontrado' });

    books.splice(index, 1);
    res.status(204).end();
});

module.exports = router;