var fs = require("fs");

// Esta es una lectura del directorio y no pasa hasta la siguiente línea (console.log) sin que termine de leer todo el directorio
// var files = fs.readdirSync('./'); Rellena files con lo que hay en el directorio ./
// console.log(files);

// Ahora va a hacer una lectura asíncrona, deja el proceso trabajando y continua con lo que hubiera después
fs.readdir('./', (error, files) => {

    if(error){
        throw error;
    }

    console.log(files); // Nos presenta el contenido del directorio actual ./


    //var archivo = fs.readFileSync('./archivo.txt', 'UTF-8'); Lectura continua, no pasa a la siguiente línea hasta que no termina

    // Lectura paralela del fichero ./archivo.txt ... console.log('Contenido del archivo...'); ... se ejecuta antes de que termine de abrir y leer el fichero
    fs.readFile('./archivo.txt','UTF-8', (error, archivo) => {
        if(error){
            throw error;
        }
        console.log(archivo);
    });

    console.log('Contenido del archivo...');
});

// Pero se aconseja usar steams cuando estemos usando ficheros con tamaños muy grandes
// Además permite no solo leer texto, sino también cualquier tipo de bytes de un fichero

