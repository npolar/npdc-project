'use strict';
/**
 * @ngInject
 */
var ProjectEditController = function ($scope, $controller, $routeParams, Project) {

  // EditController -> NpolarUiEditController
  $controller('NpolarEditController', { $scope: $scope });

  $scope.initFormula = function() {
    // Inject schema and form(ula)
    $scope.formula.schema = '//api.npolar.no/schema/project';
    $scope.formula.form = 'edit/formula.json';
    //$scope.formula.template = 'formula';
  };

  // Project -> npolarApiResource -> ngResource
  $scope.resource = Project;
  $scope.initFormula();

  $scope.expert = function() {
    $scope.formula.form = null;
  };

  $scope.isExpert = function() {
    return ($scope.formula.form === null);
  };

  // edit (or new) action
  $scope.edit();

};

module.exports = ProjectEditController;