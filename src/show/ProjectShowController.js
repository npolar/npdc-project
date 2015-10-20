'use strict';
/**
 * @ngInject
 */
var ProjectShowController = function ($scope, $controller, Project, npdcAppConfig) {
  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Project;

  $scope.show().$promise.then(data => {
    npdcAppConfig.cardTitle = data.title || data._id;
  });
};

module.exports = ProjectShowController;
