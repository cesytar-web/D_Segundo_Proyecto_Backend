const Post = require('../models/Post');
const Comment = require('../models/Comment');

const PostController = {
    create: async(req, res) => {
        try {
            const { title, content } = req.body;
            if (!content) return res.status(400).send({ message: 'El contenido es obligatorio' });

            const post = await Post.create({ title, content, author: req.user._id });
            res.status(201).send(post);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error al crear post' });
        }
    },

    getAll: async(req, res) => {
        try {
            const posts = await Post.find().populate('author').populate('comments');
            res.send(posts);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error al obtener posts' });
        }
    },

    getById: async(req, res) => {
        res.status(200).send({ message: 'Función getById temporal' });
    },

    getPostsByName: async(req, res) => {
        res.status(200).send({ message: 'Función getPostsByName temporal' });
    },

    delete: async(req, res) => {
        try {
            const post = await Post.findByIdAndDelete(req.params._id);
            if (!post) return res.status(404).send({ message: 'Post no encontrado' });
            res.send({ message: 'Post eliminado correctamente', post });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error al eliminar post' });
        }
    },

    like: async(req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).send({ message: 'Post no encontrado' });


            const userId = req.user._id;
            if (post.likes.includes(userId)) return res.status(400).send({ message: 'Ya diste like' });

            post.likes.push(userId);
            await post.save();
            res.send({ message: 'Like agregado', likes: post.likes.length });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error al dar like' });
        }
    },

    unlike: async(req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).send({ message: 'Post no encontrado' });

            post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
            await post.save();
            res.send({ message: 'Like removido', likes: post.likes.length });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error al quitar like' });
        }
    },

    addComment: async(req, res) => {
        try {
            const { content } = req.body;
            if (!content) return res.status(400).send({ message: 'El contenido del comentario es obligatorio' });

            const comment = await Comment.create({ author: req.user._id, content });
            const post = await Post.findById(req.params.id);
            post.comments.push(comment._id);
            await post.save();

            res.send({ message: 'Comentario agregado', comment });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error al agregar comentario' });
        }
    },

    getComments: async(req, res) => {
        try {
            const post = await Post.findById(req.params.id).populate({
                path: 'comments',
                populate: { path: 'author', select: 'name email' }
            });
            if (!post) return res.status(404).send({ message: 'Post no encontrado' });
            res.send(post.comments);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error al obtener comentarios' });
        }
    }
};

module.exports = PostController;