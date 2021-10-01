const http = require('http');
const fs = require('fs');

http.createServer((req, res) =>{

    if(req.method == 'GET'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream('./form.html', 'UTF-8').pipe(res);
    }else if(req.method == 'POST'){
        
        let body = '';

        req.on('data', chunk =>{body+= chunk;});


        req.on('end', () =>{
            res.writeHead(200, {'Content-Type': 'text/html'});
/* 
            res.end(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Resultados</title>
</head>
<body>
    <h1>Datos del formulario recibidos</h1>
    <p>${body}</p>
</body>
</html>
            `);
 */

            let stream = fs.createReadStream('./desplegarPost.html', 'UTF-8');

            let data = '';
            
            stream.once('data', () =>{
                console.log('Iniciando el stream...\n');
            });
            
            stream.on('data', (chunk) =>{
                //console.log(`${chunk.length} |`);
                data += chunk;
            });
            
            stream.on('end', ()=>{
                console.log('Fin del stream...\n');
                res.end(data.replace('${body}', body));

                
                
            });

            // Esta línea de abajo sustituye las líneas de arriba para cargar el fichero por steam
            // fs.createReadStream('./desplegarPost.html', 'UTF-8').pipe(res);

        });
    }

}).listen(3000);

console.log('Servidor iniciado...');