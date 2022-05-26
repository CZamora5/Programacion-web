const express = require('express');  // Inyectamps la dependencia de Express
const router = express.Router(); // Generamos una instancia de router
const mongoose = require('../node_modules/mongoose'); // Importamos mongoose

let Person = require('../models/person.js'); // Inyectamos el modelo que creamos 'Person

router.get('/persons', function(req, res, next) { // Agregamos el route handler para el endpoint persons
  Person.find(function(err, persons) {
    if (err) return next(err);
    // res.json(persons);

    res.render('personsIndex', {persons}); // Renderizamos personsIndex donde mostraremos una tabla con la información almacenada
  });
});

// Añadimos un nuevo routehandler, aquí pondremos nuestro navegar a través de la página
router.get('/main', function(req, res) {
  res.render('main');
});

router.get('/', function(req, res) {
  res.render('main');
});

// Añadimos un nuevo routehandler, aquí pondremos nuestro formulario para enviar la información
router.get('/person', function(req, res) {
  res.render('person');
});

// Agregamos una ruta post que será ejecutada cuando enviemos los datos del formulario
router.post('/addPerson', function(req, res) {
  const myPerson = new Person({ // Creamos una persona usando el modelo que creamos anteriormente
    nombre: req.body.nombre,
    edad: req.body.edad,
    tipoSangre: req.body.tipoSangre,
    nss: req.body.nss
  });
  myPerson.save(); // Guardamos la entidad en la base de datos
  res.redirect('/persons'); // Mostramos la lista de personas
});

// Agregamos un route handler que se encargará de eliminar de la base de datos las entradas que ya no necesitemos. Esto lo hará utilizando la id que le pasemos en la url
router.get('/deletePerson/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.redirect('/persons'); // Después de eliminar la persona mostramos la lista
  });
});

// Para actualizar los datos de una persona primeramente se buscara la persona mediante la id y luego nos mostrará una vista que contiene un formulario, ahí podremos actualizar la información
router.get('/findById/:id', (req, res, next) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) return next(err);
    res.render('personUpdate', {person});
  });
});

// Después de rellenar el formulario con la información a actualizar se ejecutará un método post que buscará a la persona mediante la id y modificará los datos. Finalmente redireccionaremos al listado de personas.
router.post('/updatePerson', (req, res, next) => {
  Person.findByIdAndUpdate(
    req.body.objId, 
    {
      nombre: req.body.nombre,
      edad: req.body.edad,
      tipoSangre: req.body.tipoSangre,
      nss: req.body.nss
    },
    (err, post) => {
      if (err) return next(err);
      res.redirect('/persons');
    }
  );
});

module.exports = router;