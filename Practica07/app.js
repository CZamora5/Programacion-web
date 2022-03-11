// const Emitter = require('./emitter.js'); // Inyección de nuestro constructor de la clase Emitter
const Emitter = require('events'); // Importamos el módulo events que viene en node
const config = require('./config.js'); // De igual forma importamos nuestro objectos con los magic string
 
const emtr = new Emitter(); // Creamos un objecto de la clase Emitter

/*
  Ahora podemos decir que sucederá cuando suceda un evento de tipo config.events.GREET, recordemos que
  esta variable almacena un string con el nombre del evento, en este caso es "greet", pero se podría
  cambiar fácilmente
*/
emtr.on(config.events.GREET, () => {
  console.log('Someone said hello');
});

/*
  También podemos agregar más instrucciones para un mismo evento
*/
emtr.on(config.events.GREET, () => {
  console.log('A greeting ocurred');
});

// En las lineas anteriores se asignaron dos listeners al evento 'greet'

console.log('Hello'); // Hacemos un console log para simular que ocurrió un saludo
emtr.emit(config.events.GREET); // Emitimos los listeners asociados con el evento config.events.GREET que es igual a 'greet'
// En consola aparecen dos console logs justo como esperabamos pues nosotros agregamos dos funciones cada una con un mensaje

// Podemos hacer lo mismo con el otro evento que definimos
emtr.on(config.events.JUMP, () => {
  console.log('A jump ocurred');
});

console.log('Someone jumped');
emtr.emit(config.events.JUMP);