const express = require('express'); // Importamos express
const app = express(); // Creamos una app de express

const port = process.env.PORT || 3000; // Asignamos un puerto ya sea el definido en process.env o el 3000

// Creamos un route handler para la raíz, simplemente regresamos contenido HTML con un título
app.get('/', (req, res) => { 
  res.send(`
    <html>
      <head>
        <body>
          <h1>Hello world!</h1>
        </body>
      </head>
    </html>
  `);
});

// En la ruta /api regresaremos un objecto json con el nombre y apellido de una persona
app.get('/api', (req, res) => { 
  res.json({
    firstname: 'Jonh',
    lastname: 'Doe'
  });
});

/* 
  Creamos una ruta con un parámetro llamado id que podremos accesar una vez alguien haya hecho una petición. Por ejemplo, si vamos a la página /person/Carlos entonces el parámetro id tendrá el valor 
  Carlos y la respuesta que recibiremos será Person: Carlos
*/
app.get('/person/:id', (req, res) => { 
  // Utilizamos un template string para poder dar formato al html y facilitar la lectura
  res.send(`
    <html>
      <head>
        <body>
          <h1>Person: ${req.params.id}</h1>
        </body>
      </head>
    </html>
  `);
});

app.listen(port) // Hacemos que el server eschuche en el puerto port