var readline = require('readline');
var util = require('util');

var rl = readline.createInterface(process.stdin, process.stdout);

var persona = {
    nombre: '',
    comentarios: []
};

function askByComentary() {
  rl.setPrompt('Dime un comentario: ');
  rl.prompt();
}

rl.question('Cuál es tu nombre? ', (respuesta) => {
    persona.nombre = respuesta;
    askByComentary();
});

rl.on('line', (input) => {
    if(input.trim() === 'salir'){
        var mensaje = util.format("Te llamas %s y esto me dijiste: %j", persona.nombre, persona.comentarios);
        console.log(mensaje);
        process.exit();
    }

    persona.comentarios.push(input.trim());
    askByComentary();
});

/* const request = https.request(options, (res) => {
            context.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
    context.log('LOOOL');
  })
});

request.on('error', (error) => {
  context.error(error);
});

request.end(); */