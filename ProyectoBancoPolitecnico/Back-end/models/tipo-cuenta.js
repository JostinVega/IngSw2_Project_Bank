var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoCuentaSchema = Schema({
    numero_identidad: String,
    accountType: String,
    numeroCuenta: String,
    cuentaNombre: String,
    tipoCuenta: String
});

module.exports = mongoose.model('cuenta', TipoCuentaSchema);
