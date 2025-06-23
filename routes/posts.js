const express = require('express')
const router = express.Router()
const PostController = require('../controllers/PostController')
const { authentication } = require('../middlewares/authentication')

router.post('/:id/like', authentication, PostController.like);
router.post('/:id/unlike', authentication, PostController.unlike);

router.post('/create', PostController.create)
router.get('/getAll', PostController.getAll)
router.get('/id/:_id', PostController.getById)
router.get('/name/:name', PostController.getPostsByName)
router.delete('/:_id', PostController.delete)
router.put('/:_id', PostController.update)

module.exports = router