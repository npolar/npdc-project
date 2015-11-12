'use strict';
/**
 * @ngInject
 */
var ProjectShowController = function ($scope, $controller, $q, Project, Dataset, Publication, npdcAppConfig) {
  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Project;

  $scope.translate = function (field, lang) {
    let t = $scope.document.translations;
    if (t && t[lang] && t[lang][field]) {
      return t[lang][field];
    }
    return false;
  };

  $scope.show().$promise.then(project => {
    npdcAppConfig.cardTitle = project.title || project._id;

    let relatedDatasets = Dataset.array({
      q: project.title,
      fields: 'id,title,collection',
      score: true,
      limit: 5
    }).$promise;
    let relatedPublications = Publication.array({
      q: project.title,
      fields: 'id,title,published_sort,collection',
      score: true,
      limit: 5
    }).$promise;
    let relatedProjects = Project.array({
      q: project.title,
      fields: 'id,title,collection',
      score: true,
      limit: 5,
      'not-id': project.id
    }).$promise;

    $q.all([relatedDatasets, relatedPublications, relatedProjects]).then((related) => {
      $scope.related = related.reduce((a, b) => a.concat(b), []).sort((a, b) => b._score - a._score);
    });
  });
};

module.exports = ProjectShowController;
