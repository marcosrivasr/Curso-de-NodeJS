var path = require('path');
var util = require('util');
var v8 = require('v8');

//console.log(path.join(__dirname, 'www', 'img', 'home', 'uploads'));
var nombre = "Marcos";
var edad = 25;
var texto = util.format("Hola %s, tienes %d años", nombre, edad);

console.log(v8.getHeapStatistics());