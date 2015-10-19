'use strict';

// @ngInject
var ProjectSearchController = function ($scope, $location, $controller, Project, npdcAppConfig) {

  $controller('NpolarEditController', { $scope: $scope });
  $scope.resource = Project;
  npdcAppConfig.cardTitle = 'Search results';

  let query = function(params) {
    var defaults = { limit: 999 };
    var invariants = { fields: 'title,id,updated' };
    return Object.assign(defaults, params, invariants);
  };

  let search = function(q) {
    return $scope.search(query(q)).$promise.then(data => {
      npdcAppConfig.search.facets = data.feed.facets;
    });
  };

  search();

};

module.exports = ProjectSearchController;
