var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definir el esquema para las preguntas de seguridad
var SecurityQuestionSchema = new Schema({
    value: { type: String, required: true },
    label: { type: String, required: true }
});

// Exportar el modelo
module.exports = mongoose.model('pregunta', SecurityQuestionSchema);
