'use strict';

function ProjectShowController($scope, $controller, $q,
   NpdcWarningsService, Project, ProjectModel, ProjectWarningsService, Dataset, Publication, npdcAppConfig) {
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




  this.showAction = () => {
    $scope.show().$promise.then(project => {
      NpdcWarningsService.warnings[project.id] = ProjectWarningsService.warnings(project);
    });
  };

  this.showAction();


}

module.exports = ProjectShowController;
