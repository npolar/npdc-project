'use strict';

function ProjectShowController($scope, $controller, $q, Project, ProjectModel, Dataset, Publication, npdcAppConfig) {
  'ngInject';

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Project;
  $scope.model = ProjectModel;

  $scope.translate = function (field, lang) {
    let t = $scope.document.translations;
    if (t && t[lang] && t[lang][field]) {
      return t[lang][field];
    }
    return false;
  };

  $scope.show();

}

module.exports = ProjectShowController;