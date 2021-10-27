var path = require('path');
var util = require('util');
var v8 = require('v8');

// console.log(path.basename(__filename)); // path.basename quita de un path (como __filename) la ruta y sólo deja el nombre del fichero
//console.log(path.join(__dirname, 'www', 'img', 'home', 'uploads'));
var nombre = "Marcos";
var edad = 25;
var texto = util.format("Hola %s, tienes %d años", nombre, edad);

console.log(texto);
console.log(v8.getHeapStatistics());