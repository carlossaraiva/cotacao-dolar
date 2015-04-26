var mongo = require('mongoose')
	,Schema = mongo.Schema;

var cotacaoSchema = new Schema({
  dolar: String,
  date: Date
});

module.exports = mongo.model('Cotacao', cotacaoSchema);