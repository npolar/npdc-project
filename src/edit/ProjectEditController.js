'use strict';

function ProjectEditController($scope, $controller, $routeParams,
  formula,
  NpolarLang,
  npdcAppConfig,
  Project, ProjectModel, NpdcWarningsService, ProjectWarningsService) {

  'ngInject';

  $controller('NpolarEditController', { $scope: $scope });

  function initFormula() {
    let tpl = [
      {
        match(field) { return field.id === "people_item"; },
        template: '<npdc:formula-person></npdc:formula-person>'
      },
      {
        match(field) { return field.id === "placenames_object"; },
        template: '<npdc:formula-placename></npdc:formula-placename>'
      }
    ];

    let languages = [];

    $scope.formula = formula.getInstance({
      schema: 'https://api.npolar.no/schema/project',
      language: NpolarLang.getLang(),
      form: 'edit/formula.json',
      templates: npdcAppConfig.formula.templates.concat(tpl),
      languages: npdcAppConfig.formula.languages.concat(languages)
    });

  }

  $scope.resource = Project;
  initFormula();

  // edit (or new) action
  this.editAction = () => {
    $scope.edit().$promise.then(project => {
    //  NpdcWarningsService.warnings[project.id] = ProjectWarningsService.warnings(project);
    });
  };

  this.editAction();


}

module.exports = ProjectEditController;
