

# 🧠 Red Social D_Segundo_Proyecto_Backend

## 📌 Introducción

Este proyecto es una API RESTful para una red social desarrollada con **Node.js**, **Express** y **MongoDB** (mediante **Mongoose**). Aquí se integran funcionalidades como registro/login de usuarios, creación de posts, likes, comentarios y autenticación con tokens JWT.

El objetivo es consolidar conocimientos de backend en un entorno realista, aplicando seguridad, arquitectura de rutas y controladores, y estructura de carpetas adecuada.

---

## 🛠 Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt
- JSON Web Tokens (JWT)
- Git & GitHub

---

## ⚙️ Instalación y ejecución

```bash
# Clona el repositorio
git clone https://github.com/cesytar-web/D_Segundo_Proyecto_Backend.git

# Entra en la carpeta
cd D_Segundo_Proyecto_Backend

# Instala las dependencias
npm install

# Crea un archivo .env y añade tus claves (ejemplo .env.example incluido)

# Inicia el servidor
npm run dev

🌐 Rutas / Endpoints
| Método | Ruta            | Descripción                               
| ------ | --------------- | ----------------------------------------- 
| POST   | `/users`        | Register usuario con validación y bcrypt 
| POST   | `/login`        | Login + JWT                               
| GET    | `/profile`      | Get usuario conectado                 
| DELETE | `/logout`       | Logout del usuario                      


📝 Posts
| Método | Ruta                   | Descripción                                                
| ------ | ---------------------  | -----------------------------------------------------------
| POST   | `/create`              | Create un post (validación incluida)                        
| PUT    | `/:_id`                | Update un post                                         
| DELETE | `/:_id`                | Delete un post                                           
| GET    | `/id/:_id`             | getByID todos los posts paginados + usuarios + comentarios 
| GET    | `/:_id`                | ID un post por ID                                     
| GET    | `/name/:name`          | GetByName post por nombre                                     


❤️ Likes
| Método | Ruta                 | Descripción           
| ------ | -------------------- | --------------------- 
| POST   | `/posts/:_id/like`   | Dar like a un post   
| POST   | `/posts/:_id/unlike` | Quitar like a un post 


💬 Comentarios
| Método | Ruta                | Descripción                               
| ------ | ------------------- | -------------------------------------------------
| POST   | `/comments/:postId` | createComment un comentario en un post específico


✅ Validaciones
Users: Todos los campos son obligatorios (name, email, password). Se validan antes de crear el usuario.

Users: Se validan author y content. La imagen no es obligatoria.

Authentication: Las rutas protegidas requieren un token JWT en el header:

Authorization: <TOKEN>

📂 Estructura del Proyecto

├── controllers/
│   ├── UserController.js
│   ├── PostController.js
│   └── CommentController.js
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── routes/
│   ├── users.js
│   ├── posts.js
│   └── comments.js
├── middlewares/
│   └── authentication.js
├── config/
│   └── config.js
├── index.js
└── .env



🔀 Git & Ramas
Este repositorio contiene:

main: rama principal de producción.

develop: rama activa de desarrollo.



![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA6bPOJafeQGvc0NHH-8_cEulq4xNOc9FP-Q&s)

![](https://media.licdn.com/dms/image/v2/D5612AQHwP1_BoM8xGA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1708859111443?e=1756339200&v=beta&t=QE6KgHQ7ev5GqDx9cv4ccXpSWKs_u8LzlQhJKQFNB0w)

🧠 Autor
Desarrollado por Cecilia 

