var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nuevoContactoSchema = Schema({
    numero_identidad: String,
    nombre: String,
    numeroCuenta: String,
});

module.exports=mongoose.model('contacto', nuevoContactoSchema);
