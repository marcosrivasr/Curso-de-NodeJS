const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public/'));

app.listen(3000, () =>{
    console.log('Servidor 1 iniciado...');
});