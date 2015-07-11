var express = require('express');
var router = express.Router();
var Cotacao = require('../models/cotacao.js');
var cotacao;
var fs = require('fs');
var json;

(function readJson() {
  var file = fs.readFileSync("public/etc/uf.json", "utf8");
  json = JSON.parse(file);
})();


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('cotacao');
});

router.get('/json', function (req, res, next) {
  Cotacao.find({}).sort({
    date: -1
  }).find(function (err, cotacao) {
    res.jsonp(cotacao);
  });
});


router.get('/uf', function (req, res, next) {
  res.jsonp(json);
});


router.post('/', function (req, res, next) {
  cotacao = new Cotacao();
  cotacao.dolar = req.body.dolar.replace(',', '.');
  cotacao.date = new Date();
  cotacao.origin = 'user';
  cotacao.save(function () {
    console.log('Cotação manualmente adicionado: Dolar: ' + cotacao.dolar + ', Data: ' + cotacao.date);
  });
  console.log(cotacao);
  res.redirect("/");
});

router.delete('/delete/:id', function (req, res) {
  Cotacao.remove({
    _id: req.params.id
  }, function (err, cotacao) {
    if (err) {
      res.send(err);
    }
  });
});

module.exports = router;