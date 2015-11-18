'use strict';

// @ngInject
var ProjectSearchController = function ($scope, $location, $controller, Project, npdcAppConfig) {

  $controller('NpolarEditController', { $scope: $scope });
  $scope.resource = Project;
  npdcAppConfig.cardTitle = 'Projects';

  npdcAppConfig.search.local.results.detail = (e) => {
    return "Updated: " + e.updated.split('T')[0];
   };

  npdcAppConfig.search.local.results.subtitle = "type";
  npdcAppConfig.search.local.filterUi = {
    'updated': {
      type: 'hidden'
    }
  };

  let defaults = { limit: 999, fields: 'id,title,updated'};
  let invariants = $scope.security.isAuthenticated() ? {} : { "not-draft": "yes", "not-progress": "planned" };
  let query = Object.assign( {}, defaults, invariants);

  let search = function (q) {
    $scope.search(Object.assign({}, query, q));
  };

  search(query);

  $scope.$on('$locationChangeSuccess', (event, data) => {
    search();
  });

};

module.exports = ProjectSearchController;
