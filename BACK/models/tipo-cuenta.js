var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoCuentaSchema = Schema({
    numeroIdentidad: String,
    accountType: String,
    numeroCuenta: String,
    cuentaNombre: String,
    tipoCuenta: String,
    saldo: { type: String, default: '100.00' }
});

module.exports = mongoose.model('cuenta', TipoCuentaSchema);
