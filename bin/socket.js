var Cotacao = require('../models/cotacao.js');
var io;
var socks;

function newValueQuery() {
    "use strict";
    socks.emit('time', {
        text: 'time'
    });
    Cotacao.find({}).sort({
        date: -1
    }).findOne(function (err, cotacao) {
        if (err) {
            console.log(err);
        } else {
            if (cotacao.novo === true) {
                socks.emit('new', {
                    texto: 'novo'
                });
                cotacao.novo = false;
                cotacao.save();
                console.log('New value detected:  ' + cotacao.dolar + ' ' + cotacao.date);
            }
        }
    });
}

exports.socket = function (ioRef) {
    "use strict";
    io = ioRef;
    io.on("connection", function (socket) {
        socks = socket;
        console.log("Started database polling...");
        setInterval(newValueQuery, 1000);
    });
};