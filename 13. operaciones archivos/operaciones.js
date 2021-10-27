const fs = require('fs');

// renombrar síncrono 👌🏼

//fs.renameSync('./prueba.txt', './config.txt');

// renombrar asíncrono 👍🏼 

/* fs.rename('./config.txt', './prueba.txt', (err)=>{
    if(err){
        throw(err);
    }

    console.log('El archivo fue renombrado exitosamente...');
}); */

/* fs.rename('./config.txt', './prueba.txt', function (err) {
    if(err){
        throw(err);
    }

    console.log('El archivo fue renombrado exitosamente...');
});
 */


// mover archivo 📂 ➡️ 📂
/* fs.rename('./prueba.txt', './src/prueba.txt', (err)=>{
    if(err){
        throw(err);
    }

    console.log('El archivo fue movido exitosamente...');
}); */


/* // eliminar archivo - síncrono ❌
fs.unlinkSync('./src/prueba.txt');
console.log('El archivo ha sido eliminado'); */

// eliminar archivo - asíncrono ❌
if(fs.existsSync('./src/prueba.txt')){
    fs.unlink('./src/prueba.txt', (err)=>{
        if (err) {
            throw(err);
        }
        console.log('El archivo ha sido eliminado');
    });
}

// Borrado de directorio si existe - asíncrono, con comprobación de su existencia síncrona
if(fs.existsSync('src')){
    fs.rmdir('src', function(err){
        if(err){throw(err);}
        console.log('La carpeta ha sido borrada ... 😎');
    });
}else{
    console.log('La carpeta no existe... 😧');
}