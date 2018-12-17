'use strict';
let angular = require('angular');
let AutoConfig = require('npdc-common').AutoConfig;
let npdcProjectApp = angular.module('npdcProjectApp', ['npdcCommon']);

// Bootstrap ngResource models using NpolarApiResource
let resources = [
  {'path': '/project', 'resource': 'Project' },
  {'path': '/dataset', 'resource': 'Dataset' },
  {'path': '/publication', 'resource': 'Publication' }
];

resources.forEach(function (service) {
  // Expressive DI syntax is needed here
  npdcProjectApp.factory(service.resource, ['NpolarApiResource',
    (NpolarApiResource) => NpolarApiResource.resource(service)]);
});

// Routing
npdcProjectApp.config(require('./router'));

// Auth interceptor
npdcProjectApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('npolarApiInterceptor');
});

npdcProjectApp.service('ProjectWarningsService', require('./model/ProjectWarningsService'));
npdcProjectApp.service('ProjectModel', require('./model/ProjectModel'));

// Controllers
npdcProjectApp.controller('ProjectShowController', require('./show/ProjectShowController'));
npdcProjectApp.controller('ProjectSearchController', require('./search/ProjectSearchController'));
npdcProjectApp.controller('ProjectEditController', require('./edit/ProjectEditController'));



// Inject npolarApiConfig and run
npdcProjectApp.run(function(npolarApiConfig, NpolarTranslate) {

  let environment = 'production'; // development | test | production
  let autoconfig = new AutoConfig(environment);

  Object.assign(npolarApiConfig, autoconfig);
  console.log("npolarApiConfig", npolarApiConfig);

  NpolarTranslate.loadBundles('npdc-project');

});
