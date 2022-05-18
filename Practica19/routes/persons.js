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

module.exports = router;