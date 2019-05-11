var fs = require("fs");

//var files = fs.readdirSync('./');
fs.readdir('./', (error, files) => {

    if(error){
        throw error;
    }
    console.log(files);

    //var archivo = fs.readFileSync('./archivo.txt', 'UTF-8');

    fs.readFile('./archivo.txt','UTF-8', (error, archivo) => {
        if(error){
            throw error;
        }
        console.log(archivo);
    });
    console.log('Contenido del archivo...');
});

