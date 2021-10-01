const http  = require('http');
const fs    = require('fs');
const path  = require('path');


function cargar(queCargo, req, res){
    switch (queCargo) {
        case 'css':
            cargarAlgo('UTF-8', 'text/css', req, res);
            break;

        case 'jpg':
            cargarAlgo('', 'image/jpg', req, res);
            break;

        default:
            break;
    }
}

function cargarAlgo(tipoFormato, contentType, req, res){
    const reqPath = path.join(__dirname, 'public', req.url);
    res.writeHead(200, {'Content-Type': contentType}); 
    
    if (tipoFormato === '') 
    {
        fs.createReadStream(reqPath).pipe(res);
    } else {
        fs.createReadStream(reqPath, 'UTF-8').pipe(res);
    }

}

function cargarIndex(res){
    fs.readFile('./public/index.html', 'UTF-8', (err, html) =>{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(html);
    });
}

http.createServer((req, res) =>{

    console.log(`${req.method} solicita ${req.url}`);

/*  Esta estructura if/else if está comentada porque más abajo está más simplificada

    if(req.url == '/'){
        fs.readFile('./public/index.html', 'UTF-8', (err, html) =>{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        });
    }else if(req.url.match(/.css$/)){
        const reqPath = path.join(__dirname, 'public', req.url);
        const fileStream = fs.createReadStream(reqPath, 'UTF-8');

        res.writeHead(200, {'Content-Type': 'text/css'});
        fileStream.pipe(res); 
    }else if(req.url.match(/.jpg$/)){
        const reqPath = path.join(__dirname, 'public', req.url);
        const fileStream = fs.createReadStream(reqPath);

        res.writeHead(200, {'Content-Type': 'image/jpg'});
        fileStream.pipe(res); 
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 ERROR');
    }
 */

    if(req.url == '/'){
        cargarIndex(res);
    }else if(req.url.match(/.css$/)){
        cargar('css', req, res);
    }else if(req.url.match(/.jpg$/)){
        cargar('jpg', req, res);
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 ERROR');
    }

}).listen(3000);

console.log('Servidor iniciado...');

