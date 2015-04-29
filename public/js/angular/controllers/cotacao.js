var socket = io();

socket.on('disparo', function (data) {
    "use strict";
    console.log(data);
});

var app = angular.module('App', []);

app.filter('moment', function () {
    "use strict";
    return function (input, momentFn) {
        var args = Array.prototype.slice.call(arguments, 2),
            momentObj = moment(input);
        return momentObj[momentFn].apply(momentObj, args);
    };
});

app.controller("AppCtrl", function ($scope, $http, $timeout, $interval) {
    "use strict";
    var retrieve = function () {
        $http.get('/cotacao/json').success(function (data) {
            $scope.dolar = data;
            $scope.dateNow = new Date();
        });
    };

    $scope.deleteCotacao = function (id) {
        $http.delete('/cotacao/delete/' + id).success(function (data) {
            console.log(data);
        }).error(function (data) {
            console.log("error " + data);
        });
    };

    $interval(function () {
        $scope.dateNow = new Date();
    }, 1000);

    socket.on('new', retrieve);
    retrieve();
});