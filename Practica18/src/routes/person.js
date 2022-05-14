const express = require('express'); // Importamos express
const router = express.Router(); // Creamos una instancia de router de express
 
const port = process.env.PORT || 3000; // Asignamos un puerto ya sea el definido en process.env o el 3000
 
// Agregamos un route handler que enviará un simple mensaje cuando se haga una petición get al endpoint /person
router.get('/person', (req, res) => {
  res.send('Hola, has solicitado la lista de personas');
});
 
module.exports = router; // Exportamos nuestro router