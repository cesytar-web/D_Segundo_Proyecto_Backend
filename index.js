const express = require('express')
const app = express()
const PORT = 8080;
const { dbConnection } = require('./config/config');

app.use(express.json())


// Primero conectamos a la base de datos y luego iniciamos el servidor
dbConnection()
  .then(() => {
   app.use('/users', require('./routes/users'))
   app.use('/posts', require('./routes/posts'))
   app.use('/comments', require('./routes/comments'))
   
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
  })
  .catch((error) => {
    console.error('No se pudo iniciar el servidor:', error)
  });



