/*var app = require('./app');
var mongoose = require('mongoose');
var banco = require ('./routes/banco.routes')

mongoose.connect('mongodb://localhost:27017/banco')
//mongoose.default.connect('mongodb+srv://jostinvega:JAvm1402@@cluster0.jet01gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Conexión establecida con la base de datos');
    app.listen(4000, () => {
        console.log("El servidor está corriendo: localhost: 4000");
    })
})

//Definimos ruta principal
app.use('',banco);*/

var app = require('./app');
var mongoose = require('mongoose');
var banco = require ('./routes/banco.routes');

// Codificar el símbolo @ en la contraseña
const encodedPassword = encodeURIComponent('JAvm1402@');

mongoose.connect(`mongodb+srv://jostinvega:${encodedPassword}@cluster0.jet01gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log('Conexión establecida con la base de datos');
    app.listen(4000, () => {
        console.log("El servidor está corriendo: localhost: 4000");
    });
})
.catch(err => {
    console.error('Error al conectar a la base de datos', err);
});

// Definimos ruta principal
app.use('', banco);
