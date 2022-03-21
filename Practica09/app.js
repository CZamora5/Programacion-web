const express = require('express');
const app = express();

// Asignamos un route handler cuando alguien quiera ir a la págína inicial del servidor
app.get('/', (req, res) => {
    res.send('Hello World, this is the root route');
});

app.listen(3000); // Hacemos que el server escuche en el puerto 3000

// A la ruta /uno le decimos que deberá regresar cuando haya una petición get
app.get('/uno', (req, res) => { //route handler
    res.send('Hello World, from route One');
});

// Podemos probar nuestro server utilizando el comando nodemon server en la línea de comandos y luego nos dirigimos a localhost:3000

app.get('/prueba', (req, res) => { //route handler
    res.send(`
      <div style="background-color: black; color: white">
        <h1>Esto es una prueba</h1>
        <span>Este manejador de ruta regresa contenido HTML como respuesta</span>
      </div>
    `);
});