const eventEmitterA = require('events').EventEmitter;
const util = require('util');

var Persona = function(nombre){
    this.nombre = nombre;
}

util.inherits(Persona, eventEmitterA);

let persona = new Persona('Bob');

//console.log(`Me llamo ${persona.nombre}`);

persona.on('hablar', (mensaje) => {
    console.log(`${persona.nombre}: ${mensaje}`);
});

persona.emit('hablar', 'Hoy es un gran día');


// ********************************************************************************************* //
// ** Esto lo ponemos porque el método inherits de util está deprecated                       ** //
// ********************************************************************************************* //
const EventEmitter = require('events');

// Creamos la clase MyStream que extenderá de la constante EventEmitter que cargo events
class MyStream extends EventEmitter {
  escribir(data) {
    this.emit('jopla', data); // Le pedimos a node que escuche lo que le envío al evento jopla
  }
}

const stream = new MyStream();

// Le decimos a la constante stream que escuche por el evento 'jopla'
stream.on('jopla', (data) => {
  console.log(`Received data: "${data}"`);
});

// Llamamos al evento jopla mediante el método escribir
stream.escribir('With ES6');




/*
emitter.on('eventoCustom', (mensaje, estatus) => {

    console.log(`${estatus}: ${mensaje}`);
});


emitter.emit('eventoCustom', 'Mensaje cargado con éxito', 200);
*/