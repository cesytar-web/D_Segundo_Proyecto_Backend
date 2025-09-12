const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');

// Modelos
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

// Middleware CORS para tu frontend
app.use(cors({
    origin: 'http://localhost:5173', // Cambia si tu frontend usa otro puerto
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Función para precargar datos de prueba
async function precargarDatos() {
    // Usuarios
    let users = await User.find();
    if (users.length === 0) {
        users = await Promise.all([
            bcrypt.hash('123456', 10).then(hash => User.create({ name: 'Cecilia', email: 'cecilia@example.com', password: hash })),
            bcrypt.hash('123456', 10).then(hash => User.create({ name: 'Juan', email: 'juan@example.com', password: hash })),
            bcrypt.hash('123456', 10).then(hash => User.create({ name: 'Ana', email: 'ana@example.com', password: hash }))
        ]);
        console.log('Usuarios precargados en la base de datos');
    }

    // Posts
    let posts = await Post.find();
    if (posts.length === 0) {
        await Post.insertMany([
            { title: 'Primer post', content: 'Contenido del primer post.', author: users[0]._id },
            { title: 'Segundo post', content: 'Contenido del segundo post.', author: users[1]._id }
        ]);
        console.log('Posts precargados en la base de datos');
    }
}

// Función para arreglar usuarios sin nombre
async function fixUsersWithoutName() {
    try {
        const result = await User.updateMany({ $or: [{ name: null }, { name: "" }, { name: "Desconocido" }] }, // Usuarios sin nombre
            { $set: { name: "Sin nombre" } } // Ponerles "Sin nombre"
        );
        console.log(`Usuarios actualizados: ${result.modifiedCount}`);
    } catch (error) {
        console.error('Error al actualizar usuarios sin nombre:', error);
    }
}

// Conexión a la base de datos y arranque del servidor
dbConnection()
    .then(async() => {
        await precargarDatos();
        await fixUsersWithoutName(); // Arreglar usuarios antes de iniciar el servidor

        // Rutas
        app.use('/users', require('./routes/users'));
        app.use('/posts', require('./routes/posts'));
        app.use('/comments', require('./routes/comments'));

        // Ruta de prueba para libros (si existe)
        app.use('/books', require('./routes/books'));

        app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
    })
    .catch((error) => {
        console.error('No se pudo iniciar el servidor:', error);
    });