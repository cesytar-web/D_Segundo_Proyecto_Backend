const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { jwt_secret } = require('../config/keys.js');
const Post = require('../models/Post');

const UserController = {
    // Registrar usuario
    async register(req, res) {
        try {
            let { name, email, password } = req.body;
            if (!email || !password) {
                return res.status(400).send({ message: 'Email y contraseña son obligatorios' });
            }

            // Si el nombre está vacío o es nulo, poner "Sin nombre"
            name = name && name.trim() !== "" ? name : "Sin nombre";

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send({ message: 'Email ya registrado' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ name, email, password: hashedPassword });

            const token = jwt.sign({ _id: user._id }, jwt_secret, { expiresIn: '7d' });

            user.tokens = user.tokens || [];
            if (user.tokens.length > 3) user.tokens.shift();
            user.tokens.push(token);
            await user.save();

            res.status(201).send({
                message: 'Usuario registrado con éxito',
                user: { _id: user._id, name: user.name, email: user.email },
                token,
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error al registrar el usuario' });
        }
    },

    // Login usuario
    async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(400).send({ message: 'Email o contraseña incorrectos' });

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) return res.status(400).send({ message: 'Email o contraseña incorrectos' });

            const token = jwt.sign({ _id: user._id }, jwt_secret, { expiresIn: '7d' });

            user.tokens = user.tokens || [];
            if (user.tokens.length > 3) user.tokens.shift();
            user.tokens.push(token);
            await user.save();

            res.send({ message: 'Bienvenid@ ' + user.name, token });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error en el login' });
        }
    },

    // Obtener perfil del usuario y sus posts
    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user._id).select('-password -tokens');
            const posts = await Post.find({ author: req.user._id }).populate('comments').populate('author');
            res.send({ user, posts });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error al obtener perfil del usuario' });
        }
    },

    // Logout
    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization.split(' ')[1] },
            });
            res.send({ message: 'Desconectado con éxito' });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Hubo un problema al intentar desconectar al usuario' });
        }
    },

    // Obtener todos los usuarios (sin duplicados)
    async getAllUsers(req, res) {
        try {
            const users = await User.find().select('name email');

            // Filtrar duplicados por email
            const seen = new Set();
            const uniqueUsers = users.filter(u => {
                if (seen.has(u.email)) return false;
                seen.add(u.email);
                return true;
            }).map(u => ({
                name: u.name || 'Sin nombre', // Reemplaza "Desconocido"
                email: u.email
            }));

            res.json(uniqueUsers);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    }
};

module.exports = UserController;