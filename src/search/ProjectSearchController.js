'use strict';

// @ngInject
var ProjectSearchController = function ($scope, $location, $controller, Project, npdcAppConfig) {

  $controller('NpolarEditController', { $scope: $scope });
  $scope.resource = Project;
  npdcAppConfig.cardTitle = 'Projects';

  let defaults = { limit: 999, fields: 'id,title,updated' };
  let invariants = $scope.security.isAuthenticated() ? {} : { "not-draft": "yes", "not-progress": "planned" };
  let query = Object.assign( {}, defaults, invariants);

  let search = function (q) {
    $scope.search(Object.assign({}, query, q));
  };

  search(query);

  $scope.$on('$locationChangeSuccess', (event, data) => {
    search($location.search());
  });

};

module.exports = ProjectSearchController;
