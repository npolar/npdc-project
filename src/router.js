'use strict';

/**
 * @ngInject
 */
var router = function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/:id', {
    templateUrl: 'show/show.html',
    controller: 'ProjectShowController',
    breadcrumbs: [{
      'href': '/path'
    }]
  }).when('/:id/edit', {
    template: '<npdc:formula></npdc:formula>',
    controller: 'ProjectEditController'
  }).when('/', {
    template: '<npdc-search:input></npdc-search:input><npdc:search></npdc:search>',
    controller: 'ProjectSearchController'
  });
};

module.exports = router;
