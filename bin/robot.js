var Cotacao = require('../models/cotacao.js');
var request = require('request');
var cheerio = require('cheerio');
var cron = require('cron');

var url = "http://www.valor.com.br/valor-data";

var robot = function (error, response, html) {
    "use strict";
    var $, cotacao;

    if (!error) {
        $ = cheerio.load(html);
        cotacao = new Cotacao();
        cotacao.dolar = $('.number').html();
        cotacao.date = new Date();
        cotacao.save(function () {
            console.log('Cotação atualizado: Dolar: ' + cotacao.dolar + ', Data: ' + cotacao.date);
        });
    }
};

var job = cron.job('00 00 00 * * *', function () {
    "use strict";
    request(url, robot);
});


module.exports = job;