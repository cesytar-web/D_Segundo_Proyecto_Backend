const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const { authentication } = require('../Middlewares/authentication')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/getProfile', authentication, UserController.getProfile)
router.delete('/logout', authentication, UserController.logout)


module.exports = router