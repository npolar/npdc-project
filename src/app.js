'use strict';
var angular = require('angular');

// Angular modules
require('formula');
require('angular-route');
require('angular-npolar');

var AutoConfig = require('npdc-common').AutoConfig;

var npdcProjectApp = angular.module('npdcProjectApp', ['ngRoute', 'formula', 'npolarApi', 'npolarUi', 'npdcUi', 'templates']);

// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/user', 'resource': 'User'},
  {'path': '/project', 'resource': 'Project' }
];

resources.forEach(function (service) {
  // Expressive DI syntax is needed here
  npdcProjectApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
    return NpolarApiResource.resource(service);
  }]);
});

// Routing
npdcProjectApp.config(require('./router'));

// Auth interceptor
npdcProjectApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('npolarApiInterceptor');
});

// Controllers
npdcProjectApp.controller('ProjectShowController', require('./show/ProjectShowController'));
npdcProjectApp.controller('ProjectSearchController', require('./search/ProjectSearchController'));
npdcProjectApp.controller('ProjectEditController', require('./edit/ProjectEditController'));

// Inject npolarApiConfig and run
npdcProjectApp.run(function(npolarApiConfig, npdcAppConfig) {
  var environment = 'production'; // development | test | production
  var autoconfig = new AutoConfig(environment);
  angular.extend(npolarApiConfig, autoconfig, { resources, formula : { template : 'material' } });
  console.log("npolarApiConfig", npolarApiConfig);
  npdcAppConfig.cardTitle = 'a';
  npdcAppConfig.toolbarTitle = 'Projects';
});
