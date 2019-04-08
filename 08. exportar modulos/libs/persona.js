const eventEmitter = require('events').EventEmitter;
const util = require('util');

var Persona = function(nombre){
    this.nombre = nombre;
}

util.inherits(Persona, eventEmitter);

module.exports = Persona;