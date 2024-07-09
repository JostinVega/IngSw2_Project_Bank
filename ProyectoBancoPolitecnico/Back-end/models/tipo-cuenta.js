var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoCuentaSchema = Schema({
    numeroCuenta: String,
    cuentaNombre: String,
    tipoCuenta: String
});

module.exports = mongoose.model('tipoCuenta', TipoCuentaSchema);
