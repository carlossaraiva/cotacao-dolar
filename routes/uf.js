var express = require('express');
var router = express.Router();
var estados;

(function readJson() {
  var file = require('fs').readFileSync("public/etc/uf.json", "utf8");
  estados = JSON.parse(file);
})();

router.get('/', function (req, res, next) {
  res.jsonp(estados);

});

router.post('/cidades', function (req, res, next) {
  var cities = searchCities(req.body.sigla);
  res.jsonp(cities);
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

module.exports = router;