const http = require('http');

const ordenes = [
    {'nombre': 'sopa', 'cantidad': 2, 'estado': 'servido', 'mesa': 5},
    {'nombre': 'corte de carne', 'cantidad': 2, 'estado': 'proceso', 'mesa': 4},
    {'nombre': 'sopa', 'cantidad': 1, 'estado': 'pagado', 'mesa': 3},
    {'nombre': 'ensalada', 'cantidad': 1, 'estado': 'pagado', 'mesa': 5},
    {'nombre': 'pasta', 'cantidad': 4, 'estado': 'en proceso', 'mesa': 1},
];

http.createServer((req, res) =>{
    if(req.url == '/'){
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(ordenes));
    }else if(req.url == '/ordenes-proceso'){
        pedidosEnProceso(res);
    }else if(req.url == '/ordenes-sopa'){
        pedidosPorNombre('sopa', res);
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('No se encontró la solicitud requerida');
    }
    
}).listen(3000);

console.log('servidor iniciado...');


const pedidosEnProceso = (res) =>{
    const arregloRes = ordenes.filter(item =>{
        return item.estado == 'en proceso';
    });

    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify(arregloRes));
}

const pedidosPorNombre = (nombre, res) =>{
    const arregloRes = ordenes.filter(item =>{
        return item.nombre == nombre;
    });

    res.writeHead(200, {'Content-Type': 'text/json'});
    res.end(JSON.stringify(arregloRes));
}