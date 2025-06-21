const Post = require('../models/posts')

const PostController = {
  // Crear post con validación
  async create(req, res) {
    const { author, content } = req.body;

    // Validar campos obligatorios
    if (!author || !content) {
      return res.status(400).send({ message: 'Faltan campos obligatorios: author y content son requeridos.' });
    }

    try {
      const post = await Post.create(req.body)
      res.status(201).send(post)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Ha habido un problema al crear el post' })
    }
  },

  // Obtener todos los posts con paginación
  async getAll(req, res) {
    try {
      // 1. Leer el número de página desde la URL (?page=1), si no hay, usar la página 1
      let page = req.query.page ? parseInt(req.query.page) : 1;

      // 2. Definir cuántos posts queremos mostrar por página (10)
      let limit = 10;

      // 3. Calcular cuántos posts se deben saltar para empezar en la página correcta
      let skip = (page - 1) * limit;

      // 4. Buscar posts en la base de datos, saltando y limitando resultados
      const posts = await Post.find()
        .skip(skip)  // saltar los primeros posts de las páginas anteriores
        .limit(limit); // traer solo 10 posts

      // 5. Contar cuántos posts hay en total para saber cuántas páginas hay
      const totalPosts = await Post.countDocuments();

      // 6. Responder con los posts y la información de paginación
      res.send({
        page: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts: totalPosts,
        posts: posts,
      });

    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Error al obtener los posts' })
    }
  },

  // Obtener post por ID
  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id)
      if (!post) return res.status(404).send({ message: 'Post no encontrado' })
      res.send(post)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Error al obtener el post' })
    }
  },

  // Buscar posts por nombre (asumiendo que "name" es un campo válido en posts)
  async getPostsByName(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send('Búsqueda demasiado larga')
      }
      const name = new RegExp(req.params.name, 'i')
      const posts = await Post.find({ name })

      res.send(posts)
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Error en la búsqueda' })
    }
  },

  // Eliminar post por ID
  async delete(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params._id)
      if (!post) return res.status(404).send({ message: 'Post no encontrado para eliminar' })
      res.send({ post, message: 'Post eliminado correctamente' })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Hubo un problema intentando eliminar el post' })
    }
  },

  // Actualizar post por ID
  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      )
      if (!post) return res.status(404).send({ message: 'Post no encontrado para actualizar' })
      res.send({ message: 'Post actualizado correctamente', post })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: 'Error al actualizar el post' })
    }
  },
  // Dar like a un post
async like(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).send({ message: 'Post no encontrado' });

    if (post.likes.includes(userId)) {
      return res.status(400).send({ message: 'Ya diste like a este post' });
    }

    post.likes.push(userId);
    await post.save();

    res.send({ message: 'Like agregado', likes: post.likes.length });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al dar like' });
  }
},

// Quitar like a un post
async unlike(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).send({ message: 'Post no encontrado' });

    if (!post.likes.includes(userId)) {
      return res.status(400).send({ message: 'No has dado like a este post' });
    }

    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    await post.save();

    res.send({ message: 'Like removido', likes: post.likes.length });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al quitar like' });
  }
},

}

module.exports = PostController
