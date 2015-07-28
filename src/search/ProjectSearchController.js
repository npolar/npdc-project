'use strict';
var angular = require('angular');
/**
 * @ngInject
 */
var ProjectSearchController = function ($scope, $location, $controller, Project) {

  $controller('NpolarEditController', { $scope: $scope });
  $scope.resource = Project;

  $scope.query = function() {
    var defaults = { limit: 999 };
    var invariants = { fields: 'title,id,updated' };
    return angular.extend(defaults, $location.search(), invariants);
  };

  $scope.isWriter = function() {
    return angular.isDefined($scope.user.name);
  };

  $scope.search($scope.query());

};

module.exports = ProjectSearchController;
