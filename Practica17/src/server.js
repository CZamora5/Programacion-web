const express = require('express'); // Importamos express
const app = express(); // Creamos una app de express
const mongoose = require('mongoose'); // Importamos el módulo mongoose
const students = require('./model.js'); // Importamos el modelo de la base de datos

const port = process.env.PORT || 3000; // Asignamos un puerto ya sea el definido en process.env o el 3000
app.set('view engine', 'ejs'); // Utilizaremos ejs para renderizar

app.use(express.urlencoded({extended: false})); // Indicamos que vamos a parsear datos dentro del body de la petición

//Inicializamos la conección a nuestra base de datos
mongoose.connect('mongodb+srv://carlos:carlos123@cluster0.m0pdx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(db => console.log('Conexión a la base de datos realizada correctamente'))
  .catch(err => console.error(err));

app.listen(port, () => {
  console.log("Server corriendo en puerto: " + port);
});

// Agregamos un route handler que renderizará la vista index cuando se quiera acceder a la ruta /student, aquí se podrá rellenar el formulario
app.get('/student', (req, res) => {
  res.render('index');
});

// Ahora hacemos que cuando ocurra se haga submit al formulario se guarde la respuesta en la base de datos
app.post('/student', (req, res) => {
  const data = [
    {
      firstname: req.body.fname,
      lastname: req.body.lname
    }
  ];

  students.insertMany(data, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

// Agregamos otro routehandler que nos mostrará la información en nuestra base de datos
app.get('/data', (req, res) => {
  students.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});