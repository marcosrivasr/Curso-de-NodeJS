const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public/'));

app.listen(3002, () =>{
    console.log('Servidor 2 iniciado...');
});