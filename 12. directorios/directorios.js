const fs = require('fs');

//mkdir
//fs.mkdirSync('img');

/*fs.mkdir('css', function(err){
    if(err){
        throw('Error: ' + err);
    }

    console.log('Carpeta creada...');
});
*/

// Validar si existe una carpeta

if(fs.existsSync('css')){
    console.log('La carpeta ya existe... 😧');
}else{
    fs.mkdir('css', function(err){
        if(err){throw(err);}
        console.log('La carpeta ha sido creada... 😎');
    });
    
}

