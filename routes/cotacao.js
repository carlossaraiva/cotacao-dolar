var express = require('express');
var router = express.Router();
var Cotacao = require('../models/cotacao.js');
var cotacao;
console.log(Cotacao);


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('cotacao');
});

router.post('/add', function (req, res, next) {
    cotacao = new Cotacao();
    cotacao.dolar = req.body.dolar.replace(',', '.');
    cotacao.date = req.body.date;
    cotacao.origin = 'user';
    cotacao.save(function () {
        console.log('Cotação manualmente adicionado: Dolar: ' + cotacao.dolar + ', Data: ' + cotacao.date);
    });
    console.log(cotacao);
    res.redirect("/");
});

router.get('/json', function (req, res, next) {
    Cotacao.find({}).sort({
        date: -1
    }).find(function (err, cotacao) {
        res.json(cotacao);
    });
});


module.exports = router;