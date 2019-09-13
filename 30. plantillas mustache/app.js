const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine('.mustache', mustacheExpress());
app.set('view engine', 'mustache');

app.get('/', (req, res) =>{
    const datos = [
        {nombre: 'Lena', edad: 10}, 
        {nombre: 'Luis', edad: 40}
    ];

    res.render('index',{
        titulo: 'Mi primera app', 
        nombre: 'Juan Perez', 
        datos: datos
    });
});

app.listen(3002, () =>{
    console.log('Servidor iniciado...');
});
