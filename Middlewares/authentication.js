const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js');

const authentication = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).send({ message: 'Token requerido' });

        const token = authHeader.split(' ')[1];
        if (!token) return res.status(401).send({ message: 'Token no válido' });

        const payload = jwt.verify(token, jwt_secret);

        const user = await User.findById(payload._id);
        if (!user) return res.status(401).send({ message: 'No autorizado' });

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({ message: 'Error con el token', error: error.message });
    }
};

module.exports = { authentication };