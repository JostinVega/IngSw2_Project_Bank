var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComprobanteTransferenciaSchema = new Schema({
    id_comprobante_transferencia: { type: String, required: true },
    fecha_emision: { type: String, required: true },
    archivo_comprobante_transferencia: { type: String, required: true },
    numero_comprobante_transferencia: { type: String, required: true }
});

module.exports = mongoose.model('ComprobanteTransferencia', ComprobanteTransferenciaSchema);
