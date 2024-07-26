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
app.use('',banco);


module.exports = app;*/

/*require('dotenv').config();
var app = require('./app');
var mongoose = require('mongoose');

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

module.exports = app;*/


//ESTE DE AQUÍ VA BIEN XD

var app = require('./app');
var mongoose = require('mongoose');

const encodedPassword = encodeURIComponent('JAvm1402@');

mongoose.connect(`mongodb+srv://jostinvega:${encodedPassword}@cluster0.jet01gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log('Conexión establecida con la base de datos');

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`El servidor está corriendo: localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos', err);
  });

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
















/*var app = require('./app');
var mongoose = require('mongoose');

// Codificar el símbolo @ en la contraseña
const encodedPassword = encodeURIComponent('JAvm1402@');

try {
  mongoose.connect(`mongodb+srv://jostinvega:${encodedPassword}@cluster0.jet01gs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => {
      console.log('Conexión establecida con la base de datos');

      const port = process.env.PORT || 4000;
      app.listen(port, () => {
        console.log(`El servidor está corriendo: localhost:${port}`);
      });
    })
    .catch(err => {
      console.error('Error al conectar a la base de datos', err);
    });
} catch (err) {
  console.error('Error al intentar conectar a la base de datos o iniciar el servidor:', err);
}
*/