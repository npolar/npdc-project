'use strict';
/**
 * @ngInject
 */
var ProjectShowController = function ($scope, $controller, Project) {
  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Project;
  $scope.show();
};

module.exports = ProjectShowController;