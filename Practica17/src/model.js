// En este archivo definimos la estructura de la base de datos
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let student = new Schema( // definimos los campos y el tipo de valor esperado
  {
    firstname: {
      type: String
    },
    lastname: {
      type: String
    }
  },
  { collection: "Students" }
);

module.exports = mongoose.model("students", student); // exportamos la tabla student que tendrá información de los estudiantes