const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys.js');

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ message: 'Token requerido' });

    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findOne({ _id: payload._id, tokens: token });
    if (!user) return res.status(401).send({ message: 'No autorizado' });

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error con el token', error });
  }
};

module.exports = { authentication };
