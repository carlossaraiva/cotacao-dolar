var express = require('express');
var router = express.Router();
var Cotacao = require('../models/cotacao.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    "use strict";
    res.render('index', {
        title: 'Express'
    });
    console.log(req + " " + res + " " + next);
});

router.get('/json', function (req, res, next) {
    "use strict";
    Cotacao.find(function (err, query) {
        if (!err) {
            res.json(query);
        } else {
            res.json({
                "error": "Not found",
                "header": req,
                "next": next
            });
        }
    });
});

module.exports = router;