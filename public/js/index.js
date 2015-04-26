var socket = io();

var app = angular.module('App', []);

app.filter("moment", function () {
    return function (input) {
        return moment(input).fromNow();
    };
});

app.controller("AppCtrl", function ($scope, $http) {
    $http.get('/cotacao/json').success(function (data) {
        console.log(data);
        $scope.dolar = data;
    });
    // $.getJSON('/users', function (data) {
    //     $scope.bounties = data;
    //     $scope.$apply();
    // });
});