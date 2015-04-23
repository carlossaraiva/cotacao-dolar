var Cotacao = require('../models/cotacao.js');
var request = require('request');
var cheerio = require('cheerio');
var cron = require('cron');

var url = "http://www.valor.com.br/valor-data";
var job = cron.job('00 00 00 * * *', function(){
  request(url, robot);
  console.log("teste");
  
});

var robot = function(error, response, html) {
  if (!error) {
    var $ = cheerio.load(html);

    var cotacao = new Cotacao();
    cotacao.dolar = $('.number').html();
    cotacao.date = new Date();
    cotacao.save(function(){
      console.log('Cotação atualizado: Dolar: ' + cotacao.dolar + ', Data: ' + cotacao.date);
    });
  }
}

module.exports = job;