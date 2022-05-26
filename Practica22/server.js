const express = require('express'); // Importamos express
const mongoose = require('mongoose'); // Importamos el módulo mongoose
const personsRoutes = require('./routes/persons'); // Inyectamos el router

mongoose.Promise = global.Promise; // Establecemos un valor del objeto mongoose



const app = express(); // Creamos una app de express
app.use(express.urlencoded({extended: false})); // Indicamos que vamos a parsear datos dentro del body de la petición
app.use(personsRoutes); // Hacemos que nuestra app utilice el router creado
app.use('/assets', express.static(__dirname + '/public'));  // Folder de assets
app.set('view engine', 'ejs'); // Utilizaremos ejs para renderizar

const port = process.env.PORT || 3000; // Asignamos un puerto ya sea el definido en process.env o el 3000

//Inicializamos la conección a nuestra base de datos
mongoose.connect('mongodb+srv://carlos:carlos123@cluster0.m0pdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('Error', console.error.bind(console, 'Connection error: '));
db.once('open', () => {
  console.log('Connected succesfully');
});


app.listen(port, () => {
  console.log("Server corriendo en puerto: " + port);
});