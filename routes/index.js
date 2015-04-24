var express = require('express');
var router = express.Router();
var Cotacao = require('../models/cotacao.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/json', function(req, res, next){
	Cotacao.find(function(err, cotacoes){
		if(!err){
			res.jsonp(cotacoes);
		}else{
			res.jsonp([{"Error":"That's fucked up bro..." }]);
		}
	});
});

module.exports = router;
