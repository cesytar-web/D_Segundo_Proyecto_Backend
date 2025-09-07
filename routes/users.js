const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');

// Rutas públicas
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Rutas protegidas (requieren token)
router.get('/getProfile', authentication, UserController.getProfile);
router.delete('/logout', authentication, UserController.logout);

// Obtener todos los usuarios (protegido)
router.get('/all', authentication, UserController.getAllUsers);

// Ruta para obtener datos del usuario logueado y sus posts
router.get('/me', authentication, UserController.getProfile);

module.exports = router;