const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support enc
//app.use(express.static('./public'));



app.get('/quote/line/', (req, res) =>{

    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post('/new', (req, res) =>{
    res.setHeader('Content-type', 'text/plain');
    const nombre = req.body.nombre;
    const rating = req.body.rating;

    let file = fs.readFileSync('./peliculas.json', 'UTF-8');
    const json = JSON.parse(file);
    json.peliculas.push({'nombre': nombre, 'rating': parseInt(rating)});
    
    file = fs.writeFileSync('./peliculas.json', JSON.stringify(json));

    res.setHeader('Content-type', 'html/plain');
    res.send('Datos guardados con éxito');

});

app.get('/get-peliculas', (req, res) =>{
    const file = fs.readFileSync('./peliculas.json', 'UTF-8');

    res.setHeader('Content-type', 'text/json');
    res.send(file);
});

app.listen(3000, () =>{
    console.log('Servidor inicializado...');
})