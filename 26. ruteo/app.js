const express = require('express');
const port = 3000;
const app = express();


const ordenes = [
    {'nombre': 'sopa', 'cantidad': 2, 'estado': 'servido', 'mesa': 5},
    {'nombre': 'corte de carne', 'cantidad': 2, 'estado': 'proceso', 'mesa': 4},
    {'nombre': 'sopa', 'cantidad': 1, 'estado': 'pagado', 'mesa': 3},
    {'nombre': 'ensalada', 'cantidad': 1, 'estado': 'pagado', 'mesa': 5},
    {'nombre': 'pasta', 'cantidad': 4, 'estado': 'en proceso', 'mesa': 1},
];

app.get('/pedidos-en-proceso', (req, res) =>{
    pedidosEnProceso(res);
});

app.get('/pedidos-por-nombre/:nombre', (req, res) =>{
    pedidosPorNombre(req.params.nombre,res);
});

app.listen(port, () =>{
    console.log(`Servidor iniciado en el puerto ${port}`);
});


const pedidosEnProceso = (res) =>{
    const arregloRes = ordenes.filter(item =>{
        return item.estado == 'en proceso';
    });
    res.json(arregloRes);
}

const pedidosPorNombre = (nombre, res) =>{
    const arregloRes = ordenes.filter(item =>{
        return item.nombre == nombre;
    });
    res.json(arregloRes);
}