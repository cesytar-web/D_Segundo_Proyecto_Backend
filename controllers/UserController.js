const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { jwt_secret } = require('../config/keys.js')

const UserController = {
//register users
 async register(req, res) {
   try {
    //Implementar validacion a la hora de crear un usuario
     const { name, email, password } = req.body;

    // Validación simple: comprobar que los campos existan y no estén vacíos
    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Todos los campos son obligatorios: name, email y password' });
    }
     const user = await User.create(req.body)
     res.status(201).send({ message: 'Usuario registrado con exito', user })
   } catch (error) {
     console.error(error)
     res.status(500).send({ message: 'Error al registrar el usuario' });
   }
 },

 //login users
  async login(req, res) {
   try {
     const user = await User.findOne({
       email: req.body.email,
     })
     const token = jwt.sign({ _id: user._id }, jwt_secret)
     if (user.tokens.length > 3) user.tokens.shift()
     user.tokens.push(token)
     await user.save()
     res.send({ message: 'Bienvenid@ ' + user.name, token })
   } catch (error) {
     console.error(error)
   }
 },
 //getProfile
async getProfile(req, res) {
  try {
    const user = await User.findById(req.user._id).select('-password -tokens')
    res.send(user)
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: 'Error al obtener perfil del usuario' })
  }
},

//logout
async logout(req, res) {
   try {
     await User.findByIdAndUpdate(req.user._id, {
       $pull: { tokens: req.headers.authorization },
     })
     res.send({ message: 'Desconectado con éxito' })
   } catch (error) {
     console.error(error)
     res.status(500).send({
       message: 'Hubo un problema al intentar desconectar al usuario',
     })
   }
 },

}
module.exports = UserController