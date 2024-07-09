var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var bancoroutes = require('./routes/banco.routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// Rutas de la API
app.use('/', bancoroutes);
// Ejemplo de configuración de una ruta POST para registrar un usuario

  

module.exports = app;
