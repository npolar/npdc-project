'use strict';

function ProjectEditController($scope, $controller, $routeParams,
  formula,
  NpolarLang,
  npdcAppConfig,
  Project) {
  
  'ngInject';

  $controller('NpolarEditController', { $scope: $scope });

  function initFormula() {
    let tpl = [
      {
        match(field) { return field.id === "people_object"; },
        template: '<npdc:formula-person></npdc:formula-person>'
      },
      {
        match(field) { return field.id === "placenames_object"; },
        template: '<npdc:formula-placename></npdc:formula-placename>'
      }
    ];
    
    let languages = [];
    
    $scope.formula = formula.getInstance({
      schema: '//api.npolar.no/schema/project',
      language: NpolarLang.getLang(),
      form: 'edit/formula.json',
      templates: npdcAppConfig.formula.templates.concat(tpl),
      languages: npdcAppConfig.formula.languages.concat(languages)
    });

  }

  $scope.resource = Project;
  initFormula();

  // edit (or new) action
  $scope.edit();

}

module.exports = ProjectEditController;