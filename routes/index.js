var express = require('express');
var router = express.Router();
var Cotacao = require('../models/cotacao.js');

/* GET home page. */
router.get('/', function (req, res, next) {

    Cotacao.find({}).sort({
        date: -1
    }).find(function (err, cotacao) {
        var last = cotacao[0];
        res.render('index', {
            title: 'Cotação do Dolar',
            cotacaoLast: last
        });

    });
});

router.post('/json', function (req, res, next) {
    var sort = req.body.sortField + ':' + req.body.sortOrder;
    Cotacao.find({}).sort(sort).find(function (err, cotacoes) {
        if (!err) {
            res.jsonp(cotacoes);
        } else {
            res.jsonp([{
                "Error": "That's fucked up bro..."
            }]);
        }
    });
});

module.exports = router;