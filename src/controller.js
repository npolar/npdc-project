/*jshint strict:false */

var projectApp = angular.module('projectApp', ['ngRoute']);


projectApp.controller('ProjectCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.jsonp('http://api.npolar.no/project/?q=&format=json&callback=JSON_CALLBACK&locales=utf-8')
    .success(function(data) {
      $scope.all = data;
      console.log($scope.all);
      }).error(function(data, status, headers, config) {
         console.log('error' + data);
      });
  }]);


