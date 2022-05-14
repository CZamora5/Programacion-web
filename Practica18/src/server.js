const express = require('express'); // Importamos express
const app = express(); // Creamos una app de express
 
const port = process.env.PORT || 3000; // Asignamos un puerto ya sea el definido en process.env o el 3000
 
let personRoute = require('./routes/person'); // Inyectamos nuestro router
app.set('view engine', 'ejs');
app.use(personRoute); // Hacemos que nuestra app de express use el router definido con anterioridad
app.use('/assets', express.static(__dirname + '/public'));
 
app.listen(port) // Hacemos que el server eschuche en el puerto port