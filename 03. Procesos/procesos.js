
function param(p){
    var index = process.argv.indexOf(p);
    //console.log(index);
    return process.argv[index + 1];
}

var nombre = param('--nombre');
var edad   = param('--edad'); 
console.log(`Tu nombre es ${nombre}, y tienes ${edad} años`);