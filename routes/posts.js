const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { authentication } = require('../middlewares/authentication');

router.post('/:id/like', authentication, PostController.like);
router.post('/:id/unlike', authentication, PostController.unlike);
router.post('/create', authentication, PostController.create);

router.get('/getAll', PostController.getAll);
router.get('/id/:_id', PostController.getById);         // ahora apunta a la función temporal
router.get('/name/:name', PostController.getPostsByName); // función temporal

//router.put('/:_id', authentication, PostController.update); // <-- si no existe update, comentar
router.delete('/:_id', authentication, PostController.delete);

router.post('/:id/comments', authentication, PostController.addComment);
router.get('/:id/comments', PostController.getComments);

module.exports = router;
