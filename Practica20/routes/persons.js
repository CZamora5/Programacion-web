const express = require('express');  // Inyectamps la dependencia de Express
const router = express.Router(); // Generamos una instancia de router
const mongoose = require('../node_modules/mongoose'); // Importamos mongoose

let Person = require('../models/person.js'); // Inyectamos el modelo que creamos 'Person

router.get('/persons', function(req, res, next) { // Agregamos el route handler para el endpoint persons
  Person.find(function(err, persons) {
    if (err) return next(err);
    res.json(persons);
  });
});

// Añadimos un nuevo routehandler, aquí pondremos nuestro formulario para enviar la información
router.get('/person', function(req, res) {
  res.render('person');
})

// Agregamos una ruta post que será ejecutada cuando enviemos los datos del formulario
router.post('/addPerson', function(req, res) {
  const myPerson = new Person({ // Creamos una persona usando el modelo que creamos anteriormente
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre,
    nss: req.body.nss
  });
  myPerson.save(); // Guardamos la entidad en la base de datos
});

module.exports = router;