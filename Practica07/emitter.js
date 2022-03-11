function Emitter() { // función constructora, cada instancia tendrá un atributo events que es un objecto vacío
  this.events = {};
}

Emitter.prototype.on = function (type, listener) { 
  this.events[type] = this.events[type] || []; // si ya existía la llave type en el objecto events no pasará nada, en caso contrario se asignará un array vacío
  this.events[type].push(listener); // al array que posee todos los listener asociados con el evento type le agregamos el nuevo listener
}

Emitter.prototype.emit = function (type) { // Esta funcion invocará todos los listeners cuyo tipo sea type
  if (this.events[type]) { // si no hay listeners asociados con type, no se hará nada
    this.events[type].forEach(function (listener) {
      listener(); // utilizamos el forEach para llamar a cada listener
    });
  }
}

module.exports = Emitter; // Exportamos la clase Emitter