// En este archivo definimos la estructura de la base de datos
const mongoose = require("mongoose");

let PersonSchema = new mongoose.Schema({ // definimos los campos y el tipo de valor esperado
  nombre: String,
  edad: Number,
  tipoSangre: String,
  nss: String
});

module.exports = mongoose.model('Persons', PersonSchema); // exportamos el modelo que tendrá información de las personas