var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionsSchema = Schema({
    numero_identidad: String,
    question1: String,
    answer1: String,
    question2: String,
    answer2: String,
    question3: String,
    answer3: String,
    question4: String,
    answer4: String,
    question5: String,
    answer5: String
});

module.exports = mongoose.model('preguntas-seguridad', questionsSchema);