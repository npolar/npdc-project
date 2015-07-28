'use strict';

/**
 * @ngInject
 */
var router = function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/:id', {
    templateUrl: 'show/show.html',
    controller: 'ProjectShowController',
    breadcrumbs: [{'href': '/path'}]}
   ).when('/:id/edit', {
    templateUrl: 'edit/edit.html',
    controller: 'ProjectEditController'
  }).when('/', {
    templateUrl: 'search/search.html',
    controller: 'ProjectSearchController'
  });
};

module.exports = router;