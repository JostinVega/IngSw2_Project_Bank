var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CuentaSchema = new Schema({
    numero_cuenta: { type: String, required: true },
    nombre_cuenta: { type: String, required: true },
    tipo: { type: String, required: true },
    saldo: { type: Number, required: true },
    estado: { type: String, required: true },
    fecha_apertura: { type: String, required: true },
    numero_identidad: { type: String, required: true }
});

module.exports = mongoose.model('Cuenta', CuentaSchema);
