const persona = require('./libs/persona');

let pablo = new persona('Pablo');

pablo.on('habla', (mensaje) =>{
    console.log(`${pablo.nombre}: ${mensaje}`);
});

pablo.emit('habla','Hoy va a ser un gran día');