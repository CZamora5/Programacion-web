const express = require('express'); // Importamos express
const app = express(); // Creamos una app de express

const port = process.env.PORT || 3000; // Asignamos un puerto ya sea el definido en process.env o el 3000
app.use('/assets', express.static(__dirname + '/public')); 

app.use(express.urlencoded({extended: false})); // Indicamos que vamos a parsear datos dentro del body de la petición

app.set('view engine', 'ejs'); // Especificamos nuestro template engine

/* 
  decimos que el directorio virtual para el contenido estático se llama “/assets” y que ese nombre será mapeado a una carpeta física llamada “/public”
*/

// Creamos un route handler para la raíz, simplemente regresamos contenido HTML con un título
app.get('/', (req, res) => { 
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="./assets/style.css"/>
        <title>Document</title>
      </head>
      <body>
        <h1>Hello world!</h1>
        <p>Este es un párrafo y su contenido debe ser azul</p>
      </body>
    </html>
  `);
});

app.get('/person/:id', (req, res) => { 
  // Cambiamos res.send por res.render y ademas enviamos un parametro extra llamado ID el cual se define en la URL
  // También añadimos los parámetros msg y times que será parseado por express del query string
  res.render('person', {ID: req.params.id, msg: req.query.message, times: req.query.times});
}); // No necesitamos cambiar nada de esta vista, solo modificaremos la vista person

// Agregamos un route handler que renderizará la vista index cuando se quiera acceder a la ruta /student, aquí se podrá rellenar el formulario
app.get('/student', (req, res) => {
  res.render('index');
});

// Ahora hacemos que cuando ocurra se haga submit al formulario se envie la respuesta indicando el nombre y apellidos que se ingresaron
app.post('/student', (req, res) => {
  res.send(`First name es: ${req.body.fname}, last name es: ${req.body.lname}`);
});

// Agregaremos un  route handler para “Parsear” peticiones que contienen un objeto JSON en el body y así poder usarlo como un objeto literal y acceder a todas sus llaves
app.post('/personjson', express.json({type: '*/*'}), (req, res) => {
  console.log('El objeto contiene:', (req.body));
  console.log('Nombre:', (req.body.firstname));
  console.log('Apellido:', (req.body.lastname));
});

app.listen(port) // Hacemos que el server eschuche en el puerto port