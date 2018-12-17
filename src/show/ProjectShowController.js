'use strict';

<<<<<<< Updated upstream
function ProjectShowController($scope, $controller, $q,
   NpdcWarningsService, Project, ProjectModel, ProjectWarningsService, Dataset, Publication, npdcAppConfig) {
=======
function ProjectShowController($scope, $controller, $q, NpdcWarningsService, Project, ProjectModel, Dataset, Publication, npdcAppConfig) {
>>>>>>> Stashed changes
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


<<<<<<< Updated upstream


  this.showAction = () => {
    $scope.show().$promise.then(project => {
      NpdcWarningsService.warnings[project.id] = ProjectWarningsService.warnings(project);
    });
  };

  this.showAction();

=======
  $scope.show();
>>>>>>> Stashed changes


  this.showAction = () => {
    $scope.show().$promise.then(project => {

        NpdcWarningsService.warnings[project.id] = ProjectModel.warnings(project);
        //NpdcWarningsService.notices[project.id] = DatasetModel.notices(dataset);

    });
  };

  this.showAction();


}

module.exports = ProjectShowController;
