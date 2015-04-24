var express = require('express');
var router = express.Router();
var Cotacao = require('../models/cotacao.js');

/* GET home page. */
router.get('/', function (req, res, next) {

    Cotacao.find(function (err, cotacao) {
        console.log(cotacao);
        res.render('index', {
            title: 'Cotaçãõ do Dolar - A robot example',
            cotacaoList: cotacao
        });

    });
});

router.post('/json', function (req, res, next) {
    var sort = req.body.sortField + ':' + req.body.sortOrder;
    console.log(sort);

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