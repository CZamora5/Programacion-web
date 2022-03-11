const http = require('http'); // Hacemos la inyección del módulo http que instalamos con con el comando npm i http

// Creamos un server nuevo
http.createServer((req, res) => { // Usamos arrow syntax, pero utilizar function (req, res) también es viable
    // El método createServer toma como parámetro una función que se ejecutará cada vez que el server tenga una petición y nos ayudará a manejar la respuesta que se dará al usuario
    res.writeHead(200, { 'Content-Type': 'text/plain' }); // Definimos información acerca de que tipo de respuesta se estará devolviendo, en este caso un código 200 indica que no hubo problemas y el contenido es texto plano
    res.end('Hello world\n'); // El contenido de la página será únicamente un hello world
  }).listen(1337, '127.0.0.1'); // Asignamos un puerto donde el server estará escuchando para darnos los recursos que hayamos definido

/*
  Al ejecutar en consola, aparentemente no sucede nada pero en realidad el server ya está activo esperando a que hagamos una petición. Para eso vamos a localhost:1337

  Ingresamos a dicha dirección en nuestro navegador y vemos nuestro hello world

  Al acceder a herramientas de programador en la pestaña de network y dirijiendonos a localhost header
  encontramos la URL de la petición (http://localhost:1337/), el método de la petición (GET), el código de estado (200 OK), dirección remota (127.0.0.1:1337) y la política de referencia (strict-origin-when-cross-origin)
*/