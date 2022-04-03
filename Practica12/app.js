const express = require('express'); // Importamos express
const app = express(); // Creamos una app de express

const port = process.env.PORT || 3000; // Asignamos un puerto ya sea el definido en process.env o el 3000
app.use('/assets', express.static(__dirname + '/public')); 

app.set('view engine', 'ejs'); // Especificamos nuestro template engine

/* 
  decimos que el directorio virtual para el contenido estático se llama “/assets” y que ese nombre será mapeado a una carpeta física llamada “/public”
*/

app.use('/', (req, res, next) => {
  console.log('Request URL: ' + req.url); // Imprime en consola la URL que el usuario pida
  next();
});

// // Creamos un route handler para la raíz, simplemente regresamos contenido HTML con un título
// app.get('/', (req, res) => { 
//   res.send(`
//     <html>
//       <head>
//         <link rel="stylesheet" href="./assets/style.css"/> 
//       </head>
//       <body>
//         <h1>Hello world!</h1>
//       </body>
//     </html>
//   `);
// });

app.get('/', (req, res) => { // En el route handler de la raíz renderizaremos el index.ejs que está en views
  res.render('index');
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
// app.get('/person/:id', (req, res) => { 
//   // Utilizamos un template string para poder dar formato al html y facilitar la lectura
//   res.send(`
//     <html>
//       <head>
//         <body>
//           <h1>Person: ${req.params.id}</h1>
//         </body>
//       </head>
//     </html>
//   `);
// });

app.get('/person/:id', (req, res) => { 
  // Cambiamos res.send por res.render y ademas enviamos un parametro extra llamado ID el cual se define en la URL
  res.render('person', {ID: req.params.id});
});

app.listen(port) // Hacemos que el server eschuche en el puerto port