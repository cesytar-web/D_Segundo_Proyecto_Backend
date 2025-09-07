const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const { dbConnection } = require('./config/config');

// Modelos
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

// Middleware para habilitar CORS desde el frontend
app.use(cors({
    origin: 'http://localhost:5173', // URL de tu frontend
    credentials: true, // Permite enviar cookies o headers de autenticación
}));

// Middleware para parsear JSON
app.use(express.json());

// Función para precargar datos de prueba
async function precargarDatos() {
    // Precargar usuarios
    let users = await User.find();
    if (users.length === 0) {
        users = await User.insertMany([
            { name: 'Cecilia', email: 'cecilia@example.com', password: '123456' },
            { name: 'Juan', email: 'juan@example.com', password: '123456' },
            { name: 'Ana', email: 'ana@example.com', password: '123456' }
        ]);
        console.log('Usuarios precargados en la base de datos');
    }

    // Precargar posts
    let posts = await Post.find();
    if (posts.length === 0) {
        posts = await Post.insertMany([
            { content: 'Este es el contenido del primer post.', author: users[0]._id },
            { content: 'Aquí va el contenido del segundo post.', author: users[1]._id }
        ]);
        console.log('Posts precargados en la base de datos');
    }

    // Puedes precargar comentarios de forma similar si quieres
}

// Conectar a la base de datos y luego iniciar el servidor
dbConnection()
    .then(async() => {
        await precargarDatos();

        // Rutas existentes
        app.use('/users', require('./routes/users'));
        app.use('/posts', require('./routes/posts'));
        app.use('/comments', require('./routes/comments'));

        // Nueva ruta para libros
        app.use('/books', require('./routes/books'));

        app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
    })
    .catch((error) => {
        console.error('No se pudo iniciar el servidor:', error);
    });