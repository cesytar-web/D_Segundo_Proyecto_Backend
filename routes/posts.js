const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { authentication } = require('../middlewares/authentication');

// Rutas protegidas que requieren token
router.post('/create', authentication, PostController.create);
router.post('/:id/like', authentication, PostController.like);
router.post('/:id/unlike', authentication, PostController.unlike);
router.post('/:id/comments', authentication, PostController.addComment);
router.delete('/:_id', authentication, PostController.delete);

// Rutas públicas
router.get('/getAll', PostController.getAll);
router.get('/id/:_id', PostController.getById); // función temporal pendiente de implementación
router.get('/name/:name', PostController.getPostsByName); // función temporal pendiente de implementación
router.get('/:id/comments', PostController.getComments);

module.exports = router;