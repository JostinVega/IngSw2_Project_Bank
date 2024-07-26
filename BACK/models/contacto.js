var mongoose = require('mongoose');
const tipoCuenta = require('./tipo-cuenta');
var Schema = mongoose.Schema;

var nuevoContactoSchema = Schema({
    numero_identidad: String,
    nombre: String,
    numeroCuenta: String,
    tipoCuenta: String,
    isFavorite: Boolean
});

module.exports=mongoose.model('contacto', nuevoContactoSchema);
