var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstadoDeCuentaSchema = new Schema({
    id_estado_de_cuenta: { type: String, required: true },
    fecha_inicio: { type: String, required: true },
    fecha_fin: { type: String, required: true },
    saldo_inicial: { type: Number, required: true },
    saldo_final: { type: Number, required: true },
    numero_cuenta: { type: String, required: true }
});

module.exports = mongoose.model('EstadoDeCuenta', EstadoDeCuentaSchema);
