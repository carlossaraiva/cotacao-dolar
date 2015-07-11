var express = require('express');
var router = express.Router();
var estados;
var uf = [];

(function readJson() {
  var file = require('fs').readFileSync("public/etc/uf.json", "utf8");
  estados = JSON.parse(file);
  getStates();
})();

router.get('/', function (req, res, next) {
  res.json(uf);
});

router.post('/cidades', function (req, res, next) {
  var cities = searchCities(req.body.sigla);
  res.json(cities);
});

//auxiliar functions
function searchCities(state) {
  var temp = estados
  var done = false,
    cities = [],
    i = 0
  while (!done) {
    if (temp.estados[i].sigla === state) {
      cities = temp.estados[i].cidades;
      done = true;
    }
    i++;
  }
  return cities;
}

function getStates() {
  var temp = estados;
  for (var i = 0; i < temp.estados.length; i++) {
    uf.push(temp.estados[i].sigla);
  }
}

module.exports = router;