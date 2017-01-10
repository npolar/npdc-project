//'use strict';
//require('should');
//var ProjectEditController = require('./ProjectEditController');
//
//describe('ProjectEditController', function () {
//  var $scope, $controller, $routeParams, Project, NpolarLang, npdcAppConfig, formula;
//
//  // Set up mocks
//  before(function () {
//    $scope = {formula: { getInstance: () => {}}, edit: function () {}};
//    $routeParams = {};
//    Project = {};
//    $controller = function () {};
//  });
//
//  describe('#initFormula', function () {
//    it('should set up formula on $scope', function () {
//      // jshint unused:false
//      var projectEditController = new ProjectEditController($scope, $controller, $routeParams,  formula,
//  NpolarLang,
//  npdcAppConfig, Project);
//      var expected = {
//        schema: '//api.npolar.no/schema/project',
//        form: 'edit/formula.json',
//        //template: 'bootstrap3'
//      };
//      $scope.formula.should.eql(expected);
//    });
//  });
//});