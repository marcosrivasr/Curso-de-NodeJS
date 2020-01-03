const express = require('express');
const bodyParser = require('body-parser');
//const cors = require('cors');

const app = express();
//app.use(cors());
/*
var whitelist = ['http://localhost:3001']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
*/

//app.get('/', cors(corsOptions), (req, res) =>{
app.get('/', (req, res) =>{
    res.json({mensaje: 'ok'});
});


app.listen(3001, () =>{
    console.log('API iniciado...');
});