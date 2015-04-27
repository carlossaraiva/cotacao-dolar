var socket = io();

var app = angular.module('App', []);

app.filter('moment', function () {
    return function (input, momentFn) {
        var args = Array.prototype.slice.call(arguments, 2),
            momentObj = moment(input);
        return momentObj[momentFn].apply(momentObj, args);
    };
});

app.controller("AppCtrl", function ($scope, $http, $timeout) {
    var retrieve = function () {
        $http.get('/cotacao/json').success(function (data) {
            $scope.dolar = data;
            $scope.dateNow = new Date();
            $timeout(retrieve, 100);
        });
    };
    retrieve();

    $scope.deleteCotacao = function (id) {
        $http.delete('/cotacao/delete/' + id).success(function (data) {
            console.log(data);
        }).error(function (data) {
            console.log("error " + data);
        });
    };
});