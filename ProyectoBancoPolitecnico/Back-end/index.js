var app = require('./app');
var mongoose = require('mongoose');
var banco = require ('./routes/banco.routes')

mongoose.connect('mongodb://localhost:27017/bancodb')
.then(() => {
    console.log('Conexión establecida con la base de datos');
    app.listen(4000, () => {
        console.log("El servidor está corriendo: localhost: 4000");
    })
})

//Definimos ruta principal
app.use('',banco);