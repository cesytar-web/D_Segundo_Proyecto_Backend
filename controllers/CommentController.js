const Comment = require('../models/Comment');
const Post = require('../models/posts');

const createComment = async (req, res) => {
  try {
    const { content, author } = req.body;
    const { postId } = req.params;

    // 1. Crear el comentario
    const comment = await Comment.create({
      content,
      author,
      post: postId
    });

    // 2. Agregar el comentario al post correspondiente
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id }
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el comentario', error });
  }
};

module.exports = { createComment };
