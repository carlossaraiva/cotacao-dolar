var mongo = require('mongoose'),
    Schema = mongo.Schema;

var cotacaoSchema = new Schema({
    dolar: Number,
    date: Date,
    origin: String,
    novo: Boolean
});

module.exports = mongo.model('Cotacao', cotacaoSchema);