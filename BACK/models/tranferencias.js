var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransferenciaSchema = new Schema({
    numero_comprobante_transferencia: { type: String, required: true },
    monto: { type: String, required: true },
    fecha: { type: String, required: true },
    cuenta_origen: { 
        nombre_completo: { type: String, required: true },
        numero_cuenta: { type: String, required: true }
    },
    cuenta_destino: { 
        nombre_completo: { type: String, required: true },
        numero_cuenta: { type: String, required: true }
    },
    comentario: { type: String, required: false },
    numero_cuenta: { type: String, required: true },
    id_comprobante_transferencia: { type: String, required: true }
});

module.exports = mongoose.model('Transferencia', TransferenciaSchema);
